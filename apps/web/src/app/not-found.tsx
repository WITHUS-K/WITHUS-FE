import { wrapper } from "./not-found/page.css";
import { Text } from "@repo/ui/Text";

export default function NotFound() {
    return(
        <div className={wrapper}>
            <Text variant="xxl_title_bold" color="black">
            요청하신 페이지를 찾지 못했어요
            </Text>
        </div>
    )
}