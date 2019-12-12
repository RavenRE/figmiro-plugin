import {fromPairs} from 'lodash';
import {request} from 'helpers/request';
import {IconNames, IconName, IconMarkupByName, IconMarkup} from './icon.entity';

export function getIconNames(): IconNames {
  return Object.values(IconName);
}

export async function getIcons(iconNames: IconNames): Promise<IconMarkupByName> {
  const response = await Promise.all(
    iconNames.map(async iconName => [iconName, await getIcon(iconName)])
  );
  return fromPairs(response);
}

async function getIcon(iconName: IconName): Promise<IconMarkup> {
  const response = await request.get<IconMarkup>(`/media/icons/${iconName}.svg`);
  return response.data;
}
