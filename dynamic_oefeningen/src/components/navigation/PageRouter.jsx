import {ExercisesPage} from "../../pages/ExercisesPage.jsx";
import {MenuCardPage} from "../../pages/MenuCardPage.jsx";
import {PersonsPage} from "../../pages/PersonsPage.jsx";
import {NAV_EXERCISES, NAV_MENU, NAV_PERSONS} from "../../constants/navConstants.js";

export function PageRouter(props) {
    const {activeNavBarItem, onSelectNavBarItem} = props;

    switch (activeNavBarItem) {
        case NAV_EXERCISES:
            return <ExercisesPage onSelectExercise={onSelectNavBarItem}/>;
        case NAV_MENU:
            return <MenuCardPage/>;
        case NAV_PERSONS:
            return <PersonsPage/>;
        default:
            return <ExercisesPage onSelectExercise={onSelectNavBarItem}/>;
    }
}
