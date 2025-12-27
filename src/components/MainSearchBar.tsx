import { useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "src/components/ui/input";

type FormData = {
  query: string;
};

export function MainSearchBar() {
  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      query: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values: FormData) => {
    const trimmedQuery = values.query.trim();
    if (trimmedQuery === "") {
      return;
    }
    reset();
    navigate({
      to: "/browse/results",
      search: { search: trimmedQuery },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <div className="relative w-80 max-w-full mx-auto">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search comics..."
                className="pl-10 bg-white"
                {...field}
              />
            </div>
          )}
        />
      </form>
    </div>
  );
}
