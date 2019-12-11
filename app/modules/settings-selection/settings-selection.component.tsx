import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {RadioArea, RadioBtn, RadioItems, OnRadioClick} from 'components/radio-area';
import {SettingsSelectionType} from './settings-selection.entity';
import {WithClassName} from 'utils/WithClassName';

@connect
export class SettingsSelectionComponent extends React.Component<WithClassName> {
  render(): React.ReactNode {
    const {
      settingsSelectionController: {
        selectionTypes,
        selectionType,
        changeSelectionType
      }
    } = this.rootController;
    return (
      <RadioArea
        className={this.props.className}
        items={mapSyncOptionsToRadio(selectionTypes)}
        selected={mapSyncOptionToRadio(selectionType)}
        onItemClick={mapChangeFunc(changeSelectionType)}
      />
    );
  }

  private get rootController() {
    return this.props as RootController;
  }
}

const valueMapper = {
  [SettingsSelectionType.ALL]: 'All the artboards on this page',
  [SettingsSelectionType.SELECTED]: 'Only selected artboards on this page'
};
const mapSyncOptionsToRadio = (selectionTypes: SettingsSelectionType[]): RadioItems =>
  selectionTypes.map(mapSyncOptionToRadio);
const mapSyncOptionToRadio = (selectionType: SettingsSelectionType): RadioBtn => ({
  id: selectionType,
  value: valueMapper[selectionType]
});
const mapChangeFunc = (func: (type: SettingsSelectionType) => void): OnRadioClick =>
  (id: string): void => {
    func(id as SettingsSelectionType);
  };
