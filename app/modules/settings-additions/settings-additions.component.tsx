import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {CheckboxArea, CheckboxItems, CheckboxBtn, OnCheckboxClick} from 'components/checkbox-area';
import {SettingsAdditionsType} from './settings-additions.entity';

@connect
export class SettingsAdditionsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      settingsAdditionsController: {
        additionsSettings,
        selected,
        updateAdditions
      }
    } = this.rootController;
    return (
      <CheckboxArea
        items={mapAdditionsToCheckboxes(additionsSettings)}
        selected={mapAdditionsToCheckboxes(selected)}
        onItemClick={mapChangeFunc(updateAdditions)}
      />
    );
  }

  private get rootController() {
    return this.props as RootController;
  }
}

const valueMapper = {
  [SettingsAdditionsType.HALF_SCALE]: 'Export at @2x and scale to 50%',
  [SettingsAdditionsType.OPEN_MIRO]: 'Open Miro after sync'
};
const mapAdditionsToCheckboxes = (types: SettingsAdditionsType[]): CheckboxItems =>
  types.map(mapAdditionToCheckbox);
const mapAdditionToCheckbox = (selectionType: SettingsAdditionsType): CheckboxBtn => ({
  id: selectionType,
  value: valueMapper[selectionType]
});
const mapChangeFunc = (func: (type: SettingsAdditionsType) => void): OnCheckboxClick =>
  (id: string): void => {
    func(id as SettingsAdditionsType);
  };
