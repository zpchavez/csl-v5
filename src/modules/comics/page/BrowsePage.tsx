import { useGetBrowseOptions } from "./BrowsePage.hooks";
import { SelectField } from "./SelectField";

export function BrowsePage() {
  const browseOptions = useGetBrowseOptions();

  console.log({ browseOptions });

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-center">Browse Comics</h2>
      <form>
        <SelectField label="Year" options={[]} onValueChange={() => {}} />
        <SelectField label="Title" options={[]} onValueChange={() => {}} />
        <SelectField label="Author" options={[]} onValueChange={() => {}} />
        <SelectField label="Character" options={[]} onValueChange={() => {}} />
        <SelectField label="Contents" options={[]} onValueChange={() => {}} />
      </form>
    </div>
  );
}
