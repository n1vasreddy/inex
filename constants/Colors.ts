const tintColor = '#DB1F48'; // or #F51720
const tabIconDefault = '#AEB8C4';

const colors = {
    light: {
        text: '#0A0A00',
        background: '#B1D4E0',
        tint: tintColor,
        tabIconDefault,
        tabIconSelected: tintColor,
        tileBackground: '#ECF1F2',
        avatarBackground: '#e0e0e0',
        selectedChip: '#7CF3A0',
        unselectedChip: '#e6f5fc',
        graphDataPointsColor: '#e26a00',
        graphBackgroundGradientFrom: '#93E9BE',
        graphBackgroundGradientTo: '#1D741B',
        balanceTileColor: '#B1D8B7',
    },
    dark: {
        text: '#D4F1F4',
        background: 'hsl(210, 29.03%, 24.31%)',
        tint: tintColor,
        tabIconDefault,
        tabIconSelected: tintColor,
        tileBackground: '#05445E',
        avatarBackground: '#41729F',
        selectedChip: '#02894B',
        unselectedChip: '#2F5233',
        graphDataPointsColor: '#e26a00',
        graphBackgroundGradientFrom: '#93E9BE',
        graphBackgroundGradientTo: '#1D741B',
        balanceTileColor: '#d55159',
    },
    fuchsia: '#FB4570',
    babyBlue: '#ECF1F2',
} as any;

export default colors;
