import getLoggedInUser from "@/lib/getLoggedInUser";
import AddCourseForm from "../_components/AddCourseForm";

export default async function AddCoursePage() {
  const instructor = await getLoggedInUser();

  console.log({ instructor });
  return <AddCourseForm instructor={instructor?._id.toString()} />;
}