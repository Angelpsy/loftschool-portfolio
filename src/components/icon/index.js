import './index.scss';
import vkSvg from './assets/vk.svg';
import githubSvg from './assets/github.svg';
import inSvg from './assets/in.svg';
import arrowDownSvg from './assets/arrow_down.svg';
import aboutHeaderSvg from './assets/about_header.svg';
import blogHeaderSvg from './assets/blog_header.svg';
import worksHeaderSvg from './assets/works_header.svg';
import skypeSvg from './assets/skype.svg';
import envelopeSvg from './assets/envelope.svg';
import phoneSvg from './assets/phone.svg';
import mapMarkerSvg from './assets/map_marker.svg';
import linkSvg from './assets/link.svg';
import portfArrowDownSvg from './assets/portf_arrow_down.svg';
import portfArrowUpSvg from './assets/portf_arrow_up.svg';
import loginSvg from './assets/login.svg';
import passwordSvg from './assets/password.svg';

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
        id: 'about_header',
        symbol: aboutHeaderSvg,
    },
    {
        id: 'blog_header',
        symbol: blogHeaderSvg,
    },
    {
        id: 'works_header',
        symbol: worksHeaderSvg,
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
].forEach((item) => {
    replacementViewbox(item.id, item.symbol);
});
