/**
 * Builds a course with a single chapter, sequence, and unit.
 */
export function buildSimpleCourseBlocks(courseId: any, title: any, options?: {}): {
    courseBlocks: any;
    unitBlocks: any;
    sequenceBlocks: any;
    sectionBlocks: any;
    courseBlock: any;
};
/**
 * Builds a course with a single chapter and sequence, but no units.
 */
export function buildMinimalCourseBlocks(courseId: any, title: any, options?: {}): {
    courseBlocks: any;
    unitBlocks: never[];
    sequenceBlocks: any;
    sectionBlocks: any;
    courseBlock: any;
};
/**
 * Builds a course with two branches at each node. That is:
 *
 *                  Crs
 *                   |
 *        Sec--------+-------Sec
 *         |                  |
 *   Seq---+---Seq      Seq---+---Seq
 *    |         |        |         |
 * U--+--U   U--+--U  U--+--U   U--+--U
 *                          ^
 *
 * Each left branch is indexed 0, and each right branch is indexed 1.
 * So, the caret in the diagram above is pointing to `unitTree[1][0][1]`,
 * whose parent is `sequenceTree[1][0]`, whose parent is `sectionTree[1]`.
 */
export function buildBinaryCourseBlocks(courseId: any, title: any): {
    courseBlocks: any;
    unitBlocks: never[];
    sequenceBlocks: never[];
    sectionBlocks: any[];
    courseBlock: any;
    unitTree: never[][][];
    sequenceTree: never[][];
    sectionTree: any[];
};
