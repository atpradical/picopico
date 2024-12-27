import {TotalUsers} from "@/features/public/ui";
import {Page, getLayout} from "@/shared/ui/layout";

import s from './PublicPage.module.scss'


function PublicPage() {
    return (
        <Page>
            <div className={s.container}>
                <TotalUsers counter={12345}/>
            </div>
        </Page>
    )
}

PublicPage.getLayout = getLayout
export default PublicPage