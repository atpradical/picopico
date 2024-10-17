import { inctagramApi } from "@/shared/api/inctagram.api";
import {
  Action,
  ThunkAction,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(inctagramApi.middleware),
    reducer: combineSlices(inctagramApi),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export const wrapper = createWrapper<AppStore>(makeStore);
