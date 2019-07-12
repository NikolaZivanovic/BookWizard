import APP_ROUTES from 'Config/appRoutes';

export function locationHelper(location) {
    switch (location) {
        case '/': {
            return APP_ROUTES.SUBGENRE;
        }
        case '/subgenre': {
            return APP_ROUTES.INFORMATION;
        }
        case '/add_subgenre': {
            return APP_ROUTES.INFORMATION;
        }
    }
}
