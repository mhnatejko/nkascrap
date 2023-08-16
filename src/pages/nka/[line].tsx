import NkaLine from "@/modules/Nka/NkaLine";
import { TLine, getTableData } from "@/scrapper/script";
import { NKA_LINE_URL } from "@/utils/consts";
import { NextPage } from "next";

const NkaLinePage: NextPage<{lines: string}> = ({ lines }) => (
    // <Layout {...{links}}>
        <NkaLine lines={lines} />
    // </Layout>
);

export async function getServerSideProps({ params }: { params: { line: string } }) {
    const lines = await getTableData(NKA_LINE_URL(params.line));

    return {
        props: { lines: JSON.stringify(lines) },
    };
}

export default NkaLinePage;