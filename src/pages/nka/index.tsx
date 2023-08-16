import Nka from "@/modules/Nka/Nka";
import { TLink, getNkaPage } from "@/scrapper/script";
import { NextPage } from "next";

const NkaPage: NextPage<{links: TLink[]}> = ({ links }) => <Nka links={links}/>;

export async function getServerSideProps() {
    const links = await getNkaPage();

    return {
        props: {
            links
        },
    };
}

export default NkaPage;