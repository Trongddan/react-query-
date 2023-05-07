export interface StudentInter {
  _id: string;
  name: string;
  des: string;
  quantity: number;
}
export interface book extends Omit<StudentInter, "_id"> {}
