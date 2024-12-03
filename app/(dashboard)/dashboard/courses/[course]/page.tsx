import CourseForm from "../_components/CourseForm";

export default function CouresPage({
  params: { course },
}: {
  params: { course: string };
}) {
  return (
    <div>
      <CourseForm />
    </div>
  );
}
