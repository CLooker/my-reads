import React from 'react';
import { shallow } from 'enzyme';
import Book from '../components/Book';

describe('Book', () => {
  let componentProps, component;

  beforeEach(() => {
    componentProps = {
      book: {
        id: '123',
        title: 'fake title',
        shelf: 'currentlyReading',
        imageLinks: {
          thumbnail: 'http://fake.com'
        },
        authors: ['me', 'myself', 'and I']
      },
      changeBookshelf: jest.fn()
    };
    component = shallow(<Book {...componentProps} />);
  });

  describe('initialization', () => {
    describe('code paths', () => {
      describe('`displaySearch` code paths', () => {
        describe('`displaySearch` is truthy prop', () => {
          it('should render properly', () => {
            const localComponentProps = {
              ...componentProps,
              displaySearch: true
            };

            const localComponent = shallow(<Book {...localComponentProps} />);

            expect(localComponent).toMatchSnapshot();
          });
        });

        describe('`displaySearch` is falsy prop', () => {
          it('should render properly', () => {
            const localComponentProps = {
              ...componentProps,
              displaySearch: false
            };

            const localComponent = shallow(<Book {...localComponentProps} />);

            expect(localComponent).toMatchSnapshot();
          });
        });
      });

      describe('`shelf` code paths', () => {
        describe('`shelf` is truthy prop', () => {
          it('should render properly', () => {
            expect(component).toMatchSnapshot();
          });
        });

        describe('`shelf` is falsy prop', () => {
          it('should render properly', () => {
            const localComponentProps = {
              ...componentProps,
              shelf: ''
            };

            const localComponent = shallow(<Book {...localComponentProps} />);

            expect(localComponent).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('methods', () => {
    describe('`returnImageAddress`', () => {
      describe('`checkForImageLinks` usage', () => {
        let spy;

        beforeEach(() => {
          spy = jest.spyOn(component.instance(), 'checkForImageLinks');
          component.instance().returnImageAddress(componentProps.book);
        });
        it('should call `checkForImageLinks`', () => {
          expect(spy).toHaveBeenCalled();
        });

        it('should call `checkForImageLinks` with the correct arg', () => {
          const expected = componentProps.book;
          const actual = spy.mock.calls[0][0];
          expect(actual).toBe(expected);
        });
      });

      describe('code paths', () => {
        describe('`checkForImageLinks(book)` returns true', () => {
          let spy, returnValue;

          beforeEach(() => {
            spy = jest.spyOn(component.instance(), 'convertToHttps');

            component.instance().checkForImageLinks = jest.fn(() => true);
            returnValue = component
              .instance()
              .returnImageAddress(componentProps.book);
          });

          it('should call `convertToHttps`', () => {
            expect(component.instance().convertToHttps).toHaveBeenCalled();
          });

          it('should call `convertToHttps` with the correct arg', () => {
            const expected = componentProps.book.imageLinks.thumbnail;
            const actual = spy.mock.calls[0][0];
            expect(actual).toBe(expected);
          });

          it('should return the correct value', () => {
            const expected = `https://fake.com`;
            const actual = returnValue;
            expect(actual).toBe(expected);
          });
        });

        describe('`checkForImageLinks(book)` returns false', () => {
          let spy, returnValue;

          beforeEach(() => {
            spy = jest.spyOn(component.instance(), 'returnPlaceHolder');

            component.instance().checkForImageLinks = jest.fn(() => false);
            returnValue = component
              .instance()
              .returnImageAddress(componentProps.book);
          });

          it('should call `returnPlaceHolder`', () => {
            expect(spy).toHaveBeenCalled();
          });

          it('should call `returnPlaceHolder` with the correct arg', () => {
            const expected = componentProps.book.title;
            const actual = spy.mock.calls[0][0];
            expect(actual).toBe(expected);
          });

          it('should return the correct value', () => {
            const expected = `https://via.placeholder.com/128x193/000000/ffffff?text=FAKE%20TITLE`;
            const actual = returnValue;
            expect(actual).toBe(expected);
          });
        });
      });
    });

    describe('`checkForImageLinks`', () => {
      describe('code paths', () => {
        describe('destructured `imageLinks` exists', () => {
          it('should return `true`', () => {
            const arg = {
              imageLinks: 'I exist'
            };

            const expected = true;
            const actual = component.instance().checkForImageLinks(arg);
            expect(actual).toBe(expected);
          });
        });

        describe('destructured `imageLinks` does not exist', () => {
          it('should return `false`', () => {
            const arg = {};
            const expected = false;
            const actual = component.instance().checkForImageLinks(arg);
            expect(actual).toBe(expected);
          });
        });
      });
    });

    describe('`convertToHttps`', () => {
      describe('code paths', () => {
        describe('arg includes "https"', () => {
          it('should return the arg', () => {
            const arg = 'https://www.fake.com';
            const expected = arg;
            const actual = component.instance().convertToHttps(arg);
            expect(actual).toBe(expected);
          });
        });

        describe('arg does not include "https"', () => {
          it('should return the correct string', () => {
            const arg = 'http://www.fake.com';
            const expected = 'https://www.fake.com';
            const actual = component.instance().convertToHttps(arg);
            expect(actual).toBe(expected);
          });
        });
      });
    });

    describe('`returnPlaceHolder`', () => {
      const title = 'fake title';

      let returnValue;

      describe('`encodeURI` usage', () => {
        let spy;

        beforeEach(() => {
          spy = jest.spyOn(window, 'encodeURI');
          returnValue = component.instance().returnPlaceHolder(title);
        });

        it('should call `encodeURI`', () => {
          expect(spy).toHaveBeenCalled();
        });

        it('should call `encodeURI` with the correct arg', () => {
          const expected = `https://via.placeholder.com/128x193/000000/ffffff?text=${component
            .instance()
            .returnFormattedTitle(title)}`;

          const actual = spy.mock.calls[0][0];

          expect(actual).toBe(expected);
        });
      });

      describe('`returnFormattedTitle` usage', () => {
        let spy;

        beforeEach(() => {
          spy = jest.spyOn(component.instance(), 'returnFormattedTitle');
          component.instance().returnPlaceHolder(title);
        });

        it('should call `returnFormattedTitle`', () => {
          expect(spy).toHaveBeenCalled();
        });

        it('should call `returnFormattedTitle` with the correct arg', () => {
          const expected = title;
          const actual = spy.mock.calls[0][0];
          expect(actual).toBe(expected);
        });
      });

      describe('return value', () => {
        it('should return the correct value', () => {
          const expected = `https://via.placeholder.com/128x193/000000/ffffff?text=FAKE%20TITLE`;
          const actual = returnValue;
          expect(actual).toBe(expected);
        });
      });
    });

    describe('`returnFormattedTitle`', () => {
      describe('code paths', () => {
        describe('arg `length` is less than or equal to 10', () => {
          it('should return string all-capitalized', () => {
            const arg = 'hello';
            const expected = 'HELLO';
            const actual = component.instance().returnFormattedTitle(arg);
            expect(actual).toBe(expected);
          });
        });

        describe('arg `length` is greater than 10', () => {
          it('should return a formatted string', () => {
            const arg = 'THIS IS WAY TOO LONG TO DISPLAY';
            const expected = 'THIS IS W...';
            const actual = component.instance().returnFormattedTitle(arg);
            expect(actual).toBe(expected);
          });
        });
      });
    });

    describe('`returnSelectValue`', () => {
      describe('code paths', () => {
        describe('arg is truthy', () => {
          it('should return arg', () => {
            const arg = 'currentlyReading';
            const expected = arg;
            const actual = component.instance().returnSelectValue(arg);
            expect(actual).toBe(expected);
          });
        });

        describe('arg is falsy', () => {
          it('should return " "', () => {
            const arg = '';
            const expected = ' ';
            const actual = component.instance().returnSelectValue(arg);
            expect(actual).toBe(expected);
          });
        });
      });
    });

    describe('`checkForAuthors`', () => {
      describe('code paths', () => {
        describe('first arg is truthy', () => {
          let spy, returnValue;

          const authors = ['some author'];
          const id = '123';

          beforeEach(() => {
            spy = jest.spyOn(component.instance(), 'returnAuthorsEl');
            returnValue = component.instance().returnAuthorsEl(authors, id);
          });

          describe('`returnAuthorsEl` usage', () => {
            it('should call `returnAuthorsEl`', () => {
              expect(spy).toHaveBeenCalled();
            });

            it('should call `returnAuthorsEl` with the correct args', () => {
              const expected = [authors, id];
              const actual = spy.mock.calls[0];
              expect(actual).toEqual(expected);
            });
          });

          it('should return the correct value', () => {
            const expected = component.instance().returnAuthorsEl(authors, id);
            const actual = returnValue;
            expect(actual).toEqual(expected);
          });
        });

        describe('first arg is falsy', () => {
          it('should return the correct value', () => {
            const authors = '';
            const id = '123';
            const expected = false;
            const actual = component.instance().checkForAuthors(authors, id);
            expect(actual).toEqual(expected);
          });
        });
      });
    });

    describe('`returnAuthorsEl`', () => {
      const authors = ['me'];
      const id = '123';

      let returnValue;

      beforeEach(() => {
        returnValue = component.instance().returnAuthorsEl(authors, id);
      });

      it('should have the correct `key`', () => {
        const expected = 'me123';
        const actual = returnValue[0].key;
        expect(actual).toBe(expected);
      });

      it('should have the correct `children`', () => {
        const expected = 'me';
        const actual = returnValue[0].props.children;
        expect(actual).toBe(expected);
      });
    });
  });
});
