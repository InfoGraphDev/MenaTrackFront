import AppProviders from "@/Components/FeaturesComponent/AppProviders";
import UserProvider from "@/Context/ContextApi/UserContext";
import withLazyLoading from "@/Utils/LazyLoading";
import { Provider } from "react-redux";
import { RouteObject } from "react-router-dom";
import { StoreRedux } from '@/Context/Redux/store/Store';
import MainPageNavigation from "@/Features/MainPageNavigation";
const MapContainerMain = withLazyLoading(() => import('@/Features/Maps/Maps'),{PageLoading:true});
const PageNotFound = withLazyLoading(() => import('@/Features/PageNotFound'),{PageLoading:false});

export const routes: RouteObject[] = [
    {
      element:(
            <Provider store={StoreRedux}>
              <UserProvider>
                <AppProviders/>
              </UserProvider>
            </Provider>
              ),
      children: [
        {
          path: `/`,
          element:(
              <MainPageNavigation/>
            )
        },
        {
          path: `/Main`,
          element:(
              <MapContainerMain/>
            )
        }
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    }
  ];
  