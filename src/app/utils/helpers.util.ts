/**
 * Check ObjectId validity
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-10
 *
 * @param {string} id the object id
 * @returns {RegExpMatchArray | nul} true | false
 */
export function checkObjectId(id: string): RegExpMatchArray | null {
  return id.match(/^[0-9a-fA-F]{24}$/);
}

/**
 * Omit specific properties from an object
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-02
 *
 * @param {any} object the object data
 * @param {Array<string>} excludes the properties to exclude
 * @returns {any} of the object without exclude properties
 */
export function _omit(object: any, excludes: Array<string>) {
  return Object.fromEntries(
    Object.entries(object).filter((e) => !excludes.includes(e[0]))
  );
}

/**
 * Omit specific properties from an object
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-02
 *
 * @param {strign} str the string to slugify
 * @returns {any} of the object without exclude properties
 */
export function slugify(str: string): string {
  return (
    String(str)
      // split accented characters into their base characters
      // and diacritical marks
      .normalize("NFKD")
      // remove all the accents, which happen to be all in
      // the \u03xx UNICODE block.
      .replace(/[\u0300-\u036f]/g, "")
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-")
  ); // remove consecutive hyphens
}

/**
 * Generates a unique invoice number based on the current date and the last invoice number.
 *
 * @param {number} lastNumber - The last sequential invoice number.
 * @returns {string} A new invoice number in the format 'YYYYMMDD-NNN',
 * where 'YYYYMMDD' is the current date and 'NNN' is the incremented last number, padded to 3 digits.
 */
export const generateInvoiceNumber = (lastNumber: number): string => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const nextNumber = String(lastNumber + 1).padStart(3, "0");
  return `${date}-${nextNumber}`;
}
