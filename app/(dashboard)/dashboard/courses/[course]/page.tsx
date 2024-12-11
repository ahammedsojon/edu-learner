import CourseForm from "../_components/CourseForm";

export default function CouresPage({
  params: { course: courseId },
}: {
  params: { course: string };
}) {
  return (
    <div>
      <CourseForm courseId={courseId} />
    </div>
  );
}
