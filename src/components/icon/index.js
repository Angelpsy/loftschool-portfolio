import './index.scss';
import vkSvg from './assets/sprite/vk.svg';
import githubSvg from './assets/sprite/github.svg';
import inSvg from './assets/sprite/in.svg';
import arrowDownSvg from './assets/sprite/arrow_down.svg';
import skypeSvg from './assets/sprite/skype.svg';
import envelopeSvg from './assets/sprite/envelope.svg';
import phoneSvg from './assets/sprite/phone.svg';
import mapMarkerSvg from './assets/sprite/map_marker.svg';
import linkSvg from './assets/sprite/link.svg';
import portfArrowDownSvg from './assets/sprite/portf_arrow_down.svg';
import portfArrowUpSvg from './assets/sprite/portf_arrow_up.svg';
import loginSvg from './assets/sprite/login.svg';
import passwordSvg from './assets/sprite/password.svg';
import checkSvg from './assets/sprite/check.svg';

import {replacementViewbox} from 'src/common/scripts/helpers/svg';

[
    {
        id: 'vk',
        symbol: vkSvg,
    },
    {
        id: 'github',
        symbol: githubSvg,
    },
    {
        id: 'in',
        symbol: inSvg,
    },
    {
        id: 'arrow_down',
        symbol: arrowDownSvg,
    },
    {
        id: 'skype',
        symbol: skypeSvg,
    },
    {
        id: 'envelope',
        symbol: envelopeSvg,
    },
    {
        id: 'phone',
        symbol: phoneSvg,
    },
    {
        id: 'map_marker',
        symbol: mapMarkerSvg,
    },
    {
        id: 'link',
        symbol: linkSvg,
    },
    {
        id: 'portf_arrow_down',
        symbol: portfArrowDownSvg,
    },
    {
        id: 'portf_arrow_up',
        symbol: portfArrowUpSvg,
    },
    {
        id: 'login',
        symbol: loginSvg,
    },
    {
        id: 'password',
        symbol: passwordSvg,
    },
    {
        id: 'check',
        symbol: checkSvg,
    },
].forEach((item) => {
    replacementViewbox(item.id, item.symbol);
});
