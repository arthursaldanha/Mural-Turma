interface IClassList {
  id: number;
  year: number;
  semester: number;
  course: ICourse;
}

interface ICourse {
  id: number;
  name: string;
  acronym: string;
  semesters: number;
}

export { type IClassList };
