/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ModalComponentCloseProps,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  OverflowMenuItem,
  OverflowMenuItemProps,
} from './overflowMenuItem.component';
import {
  Popover,
  PopoverProps,
} from '../popover/popover.component';
import { Omit } from '../support/typings';

type MenuItemElement = React.ReactElement<OverflowMenuItemProps>;

type PopoverContentProps = Omit<PopoverProps, 'content'>;

interface ComponentProps extends PopoverContentProps, ModalComponentCloseProps {
  children: React.ReactElement<any>;
  items: OverflowMenuItemProps[];
  onSelect?: (index: number, event: GestureResponderEvent) => void;
}

export type OverflowMenuProps = & StyledComponentProps & ComponentProps;

/**
 * Renders vertical list of menu items in a modal.
 *
 * @extends React.Component
 *
 * @property {React.ReactElement<any>} children - Determines the element above
 * which the menu will be rendered.
 *
 * @property {OverflowMenuItemType[]} items - Determines menu items.
 *
 * @property {string} size - Determines the size of the menu items components.
 * Can be `small`, `medium` or `large`.
 * Default is `medium`.
 *
 * @property {(event: GestureResponderEvent, index: number) => void} onSelect - Fires when selected item is changed.
 *
 * @property {Omit<PopoverProps, 'content'>}
 *
 * @property StyledComponentProps
 *
 * @example OverflowMenu usage example
 *
 * ```
 * import React from 'react';
 * import {
 *   OverflowMenu,
 *   Button,
 * } from 'react-native-ui-kitten';
 *
 * export class OverflowMenuShowcase extends React.Component {
 *
 *   private items: OverflowMenuItemType[] = [
 *     { text: 'Menu Item 1' },
 *     { text: 'Menu Item 2' },
 *     { text: 'Menu Item 3' },
 *   ];
 *
 *   public state = {
 *     menuVisible: false,
 *   };
 *
 *   private onItemSelect = (index: number) => {
 *     // Handle Menu Item selection
 *   };
 *
 *   private toggleMenu = () => {
 *     this.setState({ menuVisible: !this.state.menuVisible });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <OverflowMenu
 *         items={this.items}
 *         visible={this.state.menuVisible}
 *         onSelect={this.onItemSelect}
 *         onRequestClose={this.toggleMenu}>
 *         <Button onPress={this.toggleMenu}>
 *           TOGGLE MENU
 *         </Button>
 *       </OverflowMenu>
 *     );
 *   }
 * }
 * ```
 */

export class OverflowMenuComponent extends React.Component<OverflowMenuProps> {

  static styledComponentName: string = 'OverflowMenu';

  static defaultProps: Partial<OverflowMenuProps> = {
    indicatorOffset: 12,
  };

  private onItemSelect = (index: number, event: GestureResponderEvent): void => {
    if (this.props.onSelect) {
      this.props.onSelect(index, event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style, indicatorStyle } = this.props;

    const {
      dividerHeight,
      dividerBackgroundColor,
      indicatorBackgroundColor,
      ...containerParameters
    } = source;

    return {
      popover: {
        ...containerParameters,
        ...styles.popover,
        ...StyleSheet.flatten(style),
      },
      divider: {
        height: dividerHeight,
        backgroundColor: dividerBackgroundColor,
      },
      indicator: {
        backgroundColor: indicatorBackgroundColor,
        ...StyleSheet.flatten(indicatorStyle),
      },
      item: styles.item,
    };
  };

  private isLastItem = (index: number): boolean => {
    return index === this.props.items.length - 1;
  };

  private renderItemElement = (item: OverflowMenuItemProps, index: number, style: StyleType): MenuItemElement => {
    return (
      <OverflowMenuItem
        key={index}
        style={style}
        {...item}
        index={index}
        onPress={this.onItemSelect}
      />
    );
  };

  private renderContentElementChildren = (style: StyleType): MenuItemElement[] => {
    return this.props.items.map((item: OverflowMenuItemProps, index: number) => {
      const itemElement: MenuItemElement = this.renderItemElement(item, index, style.item);

      const isLastItem: boolean = this.isLastItem(index);

      const borderStyle: ViewStyle = {
        borderBottomColor: style.divider.backgroundColor,
        borderBottomWidth: isLastItem ? 0 : style.divider.height,
      };

      return React.cloneElement(itemElement, {
        style: [itemElement.props.style, borderStyle],
      });
    });
  };

  private renderPopoverContentElement = (style: StyleType): React.ReactElement<ViewProps> => {
    const menuItems: MenuItemElement[] = this.renderContentElementChildren(style);

    return (
      <View style={this.props.style}>
        {menuItems}
      </View>
    );
  };

  public render(): React.ReactNode {
    const { style, themedStyle, children, ...restProps } = this.props;
    const { popover, indicator, ...componentStyle } = this.getComponentStyle(themedStyle);

    const contentElement: React.ReactElement<ViewProps> = this.renderPopoverContentElement(componentStyle);

    return (
      <Popover
        {...restProps}
        style={popover}
        indicatorStyle={indicator}
        content={contentElement}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  popover: {
    overflow: 'hidden',
  },
  item: {},
});

export const OverflowMenu = styled<OverflowMenuProps>(OverflowMenuComponent);
