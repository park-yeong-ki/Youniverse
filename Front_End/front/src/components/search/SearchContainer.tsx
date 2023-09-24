import { useLocation } from "react-router-dom"; // 추가
import {SEARCH_PAGE} from "../../commons/constants/String"

import Wrapper from "../atoms/Wrapper"
import SearchBox from "../organisms/SearchBox"
import Text from "../atoms/Text"

const SearchContainer = () => {
    const location = useLocation();
    const searchTerm = location.state?.searchTerm ?? '';

    return (
        <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
            <Text size="Large" color="Black" fontFamily="YESGothic-Bold">{searchTerm} {SEARCH_PAGE}</Text>
            <SearchBox theme="dark" />
        </Wrapper>
    )
}

export default SearchContainer