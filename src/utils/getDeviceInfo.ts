import { TDeviceInfo } from "../types/device";

const parseBrowserType = (userAgent: string): string => {
  if (userAgent.match(/(?:Chrome|CriOS)/i)) {
    return "Chrome";
  } else if (userAgent.match(/Firefox/i)) {
    return "Firefox";
  } else if (userAgent.match(/Version\/(\d+).*Safari/i)) {
    return "Safari";
  } else if (userAgent.match(/Edge/i)) {
    return "Edge";
  } else if (
    userAgent.match(/MSIE (\d+)|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/i)
  ) {
    return "IE";
  } else if (userAgent.match(/Opera Mini\/(\d+)/i)) {
    return "Opera Mini";
  } else {
    return "Unknown";
  }
};

const parseBrowserVersion = (userAgent: string): string => {
  if (userAgent.match(/(?:Chrome|CriOS)\/(\d+)/i)) {
    const versionMatch = userAgent.match(/(?:Chrome|CriOS)\/(\d+)/i);
    return versionMatch ? versionMatch[1] : "Unknown";
  } else if (userAgent.match(/Firefox\/(\d+)/i)) {
    const versionMatch = userAgent.match(/Firefox\/(\d+)/i);
    return versionMatch ? versionMatch[1] : "Unknown";
  } else if (userAgent.match(/Version\/(\d+).*Safari/i)) {
    const versionMatch = userAgent.match(/Version\/(\d+).*Safari/i);
    return versionMatch ? versionMatch[1] : "Unknown";
  } else if (userAgent.match(/Edge\/(\d+)/i)) {
    const versionMatch = userAgent.match(/Edge\/(\d+)/i);
    return versionMatch ? versionMatch[1] : "Unknown";
  } else if (
    userAgent.match(/MSIE (\d+)|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/i)
  ) {
    const versionMatch = userAgent.match(
      /MSIE (\d+)|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/i
    );
    return versionMatch ? versionMatch[1] || versionMatch[2] : "Unknown";
  } else if (userAgent.match(/Opera Mini\/(\d+)/i)) {
    const versionMatch = userAgent.match(/Opera Mini\/(\d+)/i);
    return versionMatch ? versionMatch[1] : "Unknown";
  } else {
    return "Unknown";
  }
};

const parseUserAgent = (userAgent: string): string => {
  if (userAgent.match(/Windows/i)) {
    return "Windows";
  } else if (userAgent.match(/Macintosh|Mac OS X/i)) {
    return "macOS";
  } else if (userAgent.match(/Linux/i)) {
    return "Linux";
  } else if (userAgent.match(/iPad/i)) {
    return "iPad";
  } else if (userAgent.match(/iPhone/i)) {
    return "iPhone";
  } else if (userAgent.match(/Android/i)) {
    return "Android";
  } else {
    return "Unknown";
  }
};

export const getDeviceInfo = (): TDeviceInfo => {
  const userAgent = window.navigator.userAgent;
  const platform = parseUserAgent(userAgent);
  const browser = parseBrowserType(userAgent);
  const browserVersion = parseBrowserVersion(userAgent);

  return {
    platform: platform,
    browser: browser,
    browserVersion: browserVersion,
  };
};
