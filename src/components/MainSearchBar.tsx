import { useNavigate } from "@tanstack/react-router";
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
            <Input
              type="text"
              placeholder="Search comics..."
              className="w-80 max-w-full mx-auto bg-white"
              {...field}
            />
          )}
        />
      </form>
    </div>
  );
}
