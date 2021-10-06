
import {
    headerReducer, onChangeLink, initialHeader
} from './header';


test('Header reducer return the initial state', () => {
    expect(headerReducer(undefined, {})).toEqual(initialHeader)
});

test('Header reducer change link', () => {
    const previousState = {
        burger: { type: "secondary" },
        otherLink: { type: "primary" }
    }
    expect(headerReducer(previousState, onChangeLink("burger"))).toEqual({
        burger: { type: "primary" },
        otherLink: { type: "secondary" }
    })
});
