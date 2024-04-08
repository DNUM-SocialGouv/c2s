const isDateLessThanTwentyFourHours = (
  storedDate: string | number | Date | null
): boolean => {
  if (storedDate) {
    const storedDateTime = new Date(storedDate); // when i had stored the configs
    const twentyFourHoursAgo = new Date().getTime() - 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (storedDateTime.getTime() >= twentyFourHoursAgo) {
      return true;
    }
  }
  return false;
};

function allValuesExist<T>(obj: {
  [key: string]: T | undefined | null;
}): boolean {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] === undefined || obj[key] === null) {
        return false;
      }
    }
  }
  return true;
}

export const fetchKeycloakConfig = async () => {
  try {
    const storedDate = localStorage.getItem('keycloak.createdAt');

    const localConfigs = {
      url: localStorage.getItem('keycloak.baseUrl'),
      realm: localStorage.getItem('keycloak.realm'),
      clientId: localStorage.getItem('keycloak.clientId'),
    };
    const links = localStorage.getItem('links');
    let externlApps;
    if (links) {
      externlApps = JSON.parse(links);
    }

    // if(localConfigs && localConfigs.url && localConfigs.realm && localConfigs.clientId && isDateLessThanTwentyFourHours(storedDate!)){
    if (
      localConfigs &&
      allValuesExist(localConfigs) &&
      externlApps &&
      allValuesExist(externlApps) &&
      isDateLessThanTwentyFourHours(storedDate!)
    ) {
      return { kc: localConfigs, links: externlApps };
    } else {
      const response = await fetch('/api/config');
      if (!response.ok) {
        console.error('Failed to fetch Keycloak config');
      }
      const config = await response.json();
      console.log(config);
      const kcConfig = {
        url: config.baseUrl,
        realm: config.realm,
        clientId: config.clientId,
      };
      const externalApps = {
        ...config.externlApps,
      };

      localStorage.setItem('links', JSON.stringify(externalApps));
      localStorage.setItem('keycloak.baseUrl', kcConfig.url);
      localStorage.setItem('keycloak.realm', kcConfig.realm);
      localStorage.setItem('keycloak.clientId', kcConfig.clientId);
      localStorage.setItem('keycloak.createdAt', String(new Date()));
      return { kc: kcConfig, links: externalApps };
    }
  } catch (error) {
    console.error('Error fetching Keycloak config:', error);
    return null;
  }
};
