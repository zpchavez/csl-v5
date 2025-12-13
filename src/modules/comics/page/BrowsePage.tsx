import { Controller, useForm } from "react-hook-form";
import { useGetBrowseOptions } from "./BrowsePage.hooks";
import { SelectField } from "./SelectField";

type FormData = {
  year: string;
  title: string;
  author: string;
  character: string;
  term: string;
};

export function BrowsePage() {
  const browseOptions = useGetBrowseOptions();

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      year: "",
      title: "",
      author: "",
      character: "",
      term: "",
    },
  });

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-center">Browse Comics</h2>
      <form onSubmit={handleSubmit(() => {})}>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <SelectField
              label="Year"
              value={field.value}
              options={browseOptions?.years || []}
              onValueChange={field.onChange}
            />
          )}
        />
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <SelectField
              label="Title"
              value={field.value}
              options={browseOptions?.titles || []}
              onValueChange={field.onChange}
            />
          )}
        />
        <Controller
          name="author"
          control={control}
          render={({ field }) => (
            <SelectField
              label="Author"
              value={field.value}
              options={browseOptions?.authors || []}
              onValueChange={field.onChange}
            />
          )}
        />
        <Controller
          name="character"
          control={control}
          render={({ field }) => (
            <SelectField
              label="Character"
              value={field.value}
              options={browseOptions?.characters || []}
              onValueChange={field.onChange}
            />
          )}
        />
        <Controller
          name="term"
          control={control}
          render={({ field }) => (
            <SelectField
              label="Contents"
              value={field.value}
              options={browseOptions?.terms || []}
              onValueChange={field.onChange}
            />
          )}
        />
      </form>
    </div>
  );
}
