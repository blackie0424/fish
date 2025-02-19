import { render, screen } from '@testing-library/react-native';

import HomeScreen from '@/app/index';

describe('<HomeScreen />', () => {
    test('Text renders correctly on HomeScreen', () => {
        render(<HomeScreen />);
        const linkText = 'nivasilan ko a among';
        const linkElement = screen.getByText(linkText);
        expect(linkElement).toBeTruthy();
    });
});
