import mongoose from "mongoose";
import Order from "./order.model";
import ldOrderService from "./ld-order.service";

const POLL_INTERVAL_MS = 30 * 60 * 1000;

export interface CronState {
  id: string;
  name: string;
  schedule: string;
  status: "idle" | "running";
  lastRunAt: string | null;
  nextRunAt: string | null;
  lastResult: { checked: number; updated: number } | null;
}

const state: CronState = {
  id: "ld-tracking",
  name: "LD Order Tracking",
  schedule: "Every 30 minutes",
  status: "idle",
  lastRunAt: null,
  nextRunAt: null,
  lastResult: null,
};

export function getTrackingCronState(): CronState {
  return { ...state };
}

async function pollLdTracking(): Promise<void> {
  if (state.status === "running") {
    console.log("[LdTrackingCron] Already running, skipping");
    return;
  }

  if (mongoose.connection.readyState !== 1) {
    console.warn("[LdTrackingCron] MongoDB not connected, skipping poll");
    return;
  }

  state.status = "running";
  state.lastRunAt = new Date().toISOString();
  let checked = 0;
  let updated = 0;

  try {
    const orders = await Order.find({
      ld_order_id: { $exists: true, $ne: null },
      ld_tracking_number: { $in: [null, undefined, ""] },
      status: { $nin: ["Delivered", "Cancel"] },
    }).select("_id ld_order_id").lean();

    checked = orders.length;
    if (orders.length > 0) {
      console.log(`[LdTrackingCron] Checking tracking for ${orders.length} order(s)`);
      await Promise.all(
        orders.map(async (order: any) => {
          const trackingNumber = await ldOrderService.getTracking(order.ld_order_id);
          if (trackingNumber) {
            await Order.updateOne(
              { _id: order._id },
              { $set: { ld_tracking_number: trackingNumber } }
            );
            updated++;
            console.log(`[LdTrackingCron] Order ${order._id} → tracking ${trackingNumber}`);
          }
        })
      );
    }

    state.lastResult = { checked, updated };
  } catch (err) {
    console.error("[LdTrackingCron] poll error:", err);
    state.lastResult = { checked, updated };
  } finally {
    state.status = "idle";
  }
}

export async function runTrackingNow(): Promise<void> {
  return pollLdTracking();
}

export function startLdTrackingCron(): void {
  const next = new Date(Date.now() + POLL_INTERVAL_MS);
  state.nextRunAt = next.toISOString();

  pollLdTracking();
  setInterval(() => {
    const next = new Date(Date.now() + POLL_INTERVAL_MS);
    state.nextRunAt = next.toISOString();
    pollLdTracking();
  }, POLL_INTERVAL_MS);

  console.log("[LdTrackingCron] Started — polling every 30 minutes");
}
