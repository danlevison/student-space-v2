import Link from "next/link";

type ErrorProps = {
  errorMessage: string;
  marginTopClassName?: string;
};

export default function Error({
  errorMessage,
  marginTopClassName,
}: ErrorProps) {
  return (
    <div className={`bg-red-200 py-3 px-8 text-center ${marginTopClassName}`}>
      <h1 className="text-2xl text-red-800 font-bold">{errorMessage}</h1>
      <span className="text-lg">
        Please{" "}
        <Link className="text-blue-600 font-bold underline" href={"/"}>
          refresh the page
        </Link>{" "}
        and try again.
      </span>
    </div>
  );
}
