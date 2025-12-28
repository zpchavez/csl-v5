import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutRoute,
});

function AboutRoute() {
  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-center">About the Comic Strip Library</h2>
      <p className="paragraph">
        The Comic Strip Library is a digital library containing a collection of
        public domain comic strips. Everything in the collection predates 1923
        and is no longer under copyright in the United States. Unlike many comic
        databases which are indexed by date alone, the comics in the Comic Strip
        Library are thoroughly cataloged. Searches on the Comic Strip Library
        can match text from dialogue and narration; character names; subject
        matter; objects, creatures, and people depicted in a strip; or even
        literary techniques. For example, a search for "fourth wall" will turn
        up comic strips which break the fourth wall, and a search for "puns"
        will bring up comics containing word play.
      </p>
      <p className="paragraph">
        The Comic Strip Library began as a class project. I continued working on
        it on-and-off for some years after graduating. Now it exists in this
        read-only form.
      </p>
    </div>
  );
}
