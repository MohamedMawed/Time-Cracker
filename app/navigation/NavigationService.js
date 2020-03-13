
let _navigator;
import { CommonActions } from '@react-navigation/native';

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params : params
      })
    );
  }

  function reset(routeName) {
    _navigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: routeName },
          ],
        })
      );
  }



function goBack(key) {
  _navigator.dispatch(
    NavigationActions.back({
      key: key,
    }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  reset,
  goBack,
  setTopLevelNavigator
};
