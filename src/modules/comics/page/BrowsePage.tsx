import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
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
  const { handleSubmit, control, watch } = useForm<FormData>({
    defaultValues: {
      year: "",
      title: "",
      author: "",
      character: "",
      term: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const values = watch();

  const filters = useMemo(
    () => ({
      year: values.year || undefined,
      title: values.title || undefined,
      author: values.author || undefined,
      character: values.character || undefined,
      term: values.term || undefined,
    }),
    [values.year, values.title, values.author, values.character, values.term],
  );

  const browseOptions = useGetBrowseOptions(filters);

  const navigate = useNavigate({ from: "/browse" });

  const onSubmit = useCallback(
    (data: FormData) => {
      const searchWithEmptyValuesRemoved: Record<string, string> = {};
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          searchWithEmptyValuesRemoved[key] = value;
        }
      });
      navigate({
        to: "/browse/results",
        search: searchWithEmptyValuesRemoved,
      });
    },
    [navigate],
  );

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-center block pb-4">Browse Comics</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" variant="outline" className="mx-auto block">
          Submit
        </Button>
      </form>
    </div>
  );
}
