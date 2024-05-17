import { ProblemCategory as ProblemCategoryType } from "lib/study/Types";
import { ProblemCategory } from "./ProblemCategory";

interface ProblemCategoryGridProps {
    categories: ProblemCategoryType[];
}

export function ProblemCategoryGrid(props: ProblemCategoryGridProps) {
    return <div className="grid grid-col-1 space-y-12 text-xl justify-center">
        {props.categories.map((problemCategory) => {
            return <ProblemCategory category={problemCategory} />
        })}
    </div>;
}
