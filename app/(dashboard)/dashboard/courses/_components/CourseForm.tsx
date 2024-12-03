import { Description } from "@radix-ui/react-dialog";
import SubTitleForm from "./SubTitleForm";
import TitleForm from "./TitleForm";
import PriceForm from "./PriceForm";
import CategoryForm from "./CategoryForm";
import TagsForm from "./TagsForm";
import ModulesForm from "./MoudulesForm";
import DescriptionForm from "./DescriptionForm";
import ThumbnailForm from "./ThumbnailForm";

const CourseForm = () => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="col-span-2 w-full md:max-w-[70%] mx-auto">
        <ThumbnailForm />
      </div>
      <TitleForm />
      <SubTitleForm />
      <DescriptionForm />
      <PriceForm />
      <CategoryForm />
      <TagsForm />
      <ModulesForm />
    </div>
  );
};

export default CourseForm;
