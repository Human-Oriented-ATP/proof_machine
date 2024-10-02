import StudyScreen from "components/navigation/StudyScreen";
import { promises as fs } from "fs"
import { StudyConfiguration } from "lib/study/Types";

export async function generateStaticParams() {
    let configurations = ["pilot1", "pilot2", "new-tutorial"]
    const slugs = configurations.map(problem => ({ slug: problem }))
    return slugs
}

export default async function Page({ params }: { params: { slug: string } }) {
    const configurationIdentifier = params.slug
    const configuration : StudyConfiguration = JSON.parse(await fs.readFile(process.cwd() + "/study_setup/" + configurationIdentifier + ".json", "utf-8"))

    return <StudyScreen config={configuration} />
}