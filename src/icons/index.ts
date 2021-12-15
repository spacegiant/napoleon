// Code modified from advanced-tables-obsidian/src/main.ts 
import { addIcon } from 'obsidian';

export const icons: Record<string, string> = {
  d: `
  <svg width="100%" height="100%" viewBox="0 0 482 482" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
  <g transform="matrix(1,0,0,1,0,-4.27915)">
      <g id="d" transform="matrix(1.41943,0,0,2.09057,-359.823,-449.661)">
          <rect x="253.498" y="217.138" width="339.573" height="230.56" style="fill:none;"/>
          <g transform="matrix(0.704508,0,0,0.47834,244.513,214.418)">
              <path  fill="currentColor" d="M83.611,452.485L83.611,40.886L225.396,40.886C257.403,40.886 281.83,42.851 298.676,46.782C322.26,52.21 342.381,62.037 359.04,76.262C380.752,94.605 396.99,118.049 407.752,146.593C418.515,175.137 423.896,207.753 423.896,244.439C423.896,275.698 420.246,303.4 412.946,327.545C405.646,351.691 396.288,371.672 384.87,387.488C373.452,403.305 360.958,415.752 347.388,424.83C333.818,433.908 317.44,440.787 298.254,445.466C279.069,450.145 257.029,452.485 232.135,452.485L83.611,452.485ZM138.079,403.913L225.958,403.913C253.098,403.913 274.389,401.386 289.831,396.332C305.273,391.279 317.58,384.166 326.752,374.994C339.667,362.079 349.728,344.719 356.934,322.913C364.14,301.107 367.743,274.668 367.743,243.597C367.743,200.547 360.677,167.463 346.546,144.347C332.414,121.231 315.241,105.742 295.026,97.881C280.426,92.265 256.935,89.458 224.554,89.458L138.079,89.458L138.079,403.913Z" style="fill-rule:nonzero;"/>
          </g>
      </g>
  </g>
</svg>
`,
    play: `
  <svg viewBox="0 0 482 482" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-638.622,0)">
        <g id="play" transform="matrix(1.41943,0,0,2.09057,278.8,-453.94)">
            <rect x="253.498" y="217.138" width="339.573" height="230.56" style="fill:none;"/>
            <g transform="matrix(4.31387e-17,0.47834,-0.704508,2.92898e-17,583.752,-92.6601)">
                <path fill="currentColor" d="M888.652,52.128L1096.27,375.418L681.035,375.418L888.652,52.128Z"/>
            </g>
        </g>
    </g>
  </svg>`
};

export const addIcons = (): void => {
  Object.keys(icons).forEach((key) => {
    // Don't add the 'help' icon here as it will overwrite the native one.
    if (key !== 'help') {
      addIcon(key, icons[key]);
    }
  });
};