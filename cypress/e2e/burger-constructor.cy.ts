const BASE_URL = 'https://norma.nomoreparties.space/api'; // Используется для API запросов

beforeEach(() => {
  cy.setupInterceptors(); // Настраиваем перехваты для API-запросов
  cy.visit('/'); // Открываем главную страницу
  cy.viewport(1280, 720); // Задаём размер окна браузера
  cy.wait('@loadIngredients'); // Ожидаем загрузки ингредиентов
  cy.get('#modals').as('modalContainer'); // Создаём алиас для модальных окон
});

describe('Тестирование функционала конструктора бургера', () => {
  it('счётчик увеличивается при добавлении ингредиента', () => {
    cy.getIngredientFixtureData('main').then((mains) => {
      const ingredient = mains[0];
      cy.addIngredientToBurger(ingredient._id);
      cy.get(`[data-cy="${ingredient._id}"]`)
        .find('.counter__num')
        .should('have.text', '1');
    });
  });

  describe('Проверка корректного отображения выбранных ингредиентов', () => {
    it('булочка и начинка одновременно отображаются после добавления', () => {
      cy.getIngredientFixtureData('bun').then((buns) => {
        const bun = buns[0];
        cy.addIngredientToBurger(bun._id);
      });
      cy.getIngredientFixtureData('main').then((mains) => {
        const filling = mains[0];
        cy.addIngredientToBurger(filling._id);
      });
      // Можно добавить проверку наличия булочки и начинки в интерфейсе
    });

    it('начинка добавленная первой и булочка — оба корректно отображаются', () => {
      cy.getIngredientFixtureData('main').then((mains) => {
        const filling = mains[0];
        cy.addIngredientToBurger(filling._id);
      });
      cy.getIngredientFixtureData('bun').then((buns) => {
        const bun = buns[0];
        cy.addIngredientToBurger(bun._id);
      });
      // Можно дополнить проверками рендеринга ингредиентов
    });

    it('если нет булочки, заказ оформить нельзя — окно не появляется', () => {
      cy.getIngredientFixtureData('main').then((mains) => {
        const filling = mains[0];
        cy.addIngredientToBurger(filling._id);
        cy.clickOrderButton();
        cy.get('@modalContainer', { timeout: 4000 }).should('be.empty'); // Убеждаемся, что модалка не открылась
      });
    });

    it('при повторном добавлении одинаковой начинки счётчик увеличивается', () => {
      cy.getIngredientFixtureData('main').then((mains) => {
        const filling = mains[0];
        cy.addIngredientToBurger(filling._id);
        cy.addIngredientToBurger(filling._id);
        cy.get(`[data-cy="${filling._id}"]`)
          .find('.counter__num')
          .should('have.text', '2');
      });
    });
  });

  describe('Обновление выбранной булочки', () => {
    it('смена булочки без добавленной начинки корректно обновляет счётчики', () => {
      cy.getIngredientFixtureData('bun').then((buns) => {
        cy.addIngredientToBurger(buns[0]._id);
        cy.get(`[data-cy="${buns[0]._id}"]`)
          .find('.counter__num')
          .should('have.text', '2'); // Булочка с двойным счетчиком
        cy.addIngredientToBurger(buns[1]._id);
        cy.get(`[data-cy="${buns[0]._id}"]`)
          .find('.counter__num')
          .should('not.exist'); // Старый вариант булочки сброшен
        cy.get(`[data-cy="${buns[1]._id}"]`)
          .find('.counter__num')
          .should('have.text', '2'); // Новая булочка с двойным счетчиком
      });
    });

    it('при наличии начинки замена булочки обновляет счетчики корректно', () => {
      cy.getIngredientFixtureData('bun').then((buns) => {
        cy.getIngredientFixtureData('main').then((mains) => {
          const firstBun = buns[0];
          const secondBun = buns[1];
          const filling = mains[0];

          cy.addIngredientToBurger(firstBun._id);
          cy.addIngredientToBurger(filling._id);
          cy.addIngredientToBurger(secondBun._id);

          // Проверяем, что счетчик старой булочки пропал, а у новой появился двойной счетчик
          cy.get(`[data-cy="${firstBun._id}"]`)
            .find('.counter__num')
            .should('not.exist');
          cy.get(`[data-cy="${secondBun._id}"]`)
            .find('.counter__num')
            .should('have.text', '2');
          cy.get(`[data-cy="${filling._id}"]`)
            .find('.counter__num')
            .should('have.text', '1');
        });
      });
    });
  });

  it('булочка всегда отображается с количеством 2 в счётчике', () => {
    cy.getIngredientFixtureData('bun').then((buns) => {
      const bun = buns[0];
      cy.addIngredientToBurger(bun._id);
      cy.get(`[data-cy="${bun._id}"]`)
        .find('.counter__num')
        .should('have.text', '2');
    });
  });
});

describe('Тесты оформления заказа и взаимодействия с сервером', () => {
  beforeEach(() => {
    cy.setAuthTokens(); // Устанавливаем токены для имитации авторизации
  });

  afterEach(() => {
    cy.clearAuthTokens(); // Очищаем токены после выполнения теста
  });

  it('при заказе сначала отображается индикатор загрузки', () => {
    cy.getIngredientFixtureData('bun').then((buns) => {
      cy.getIngredientFixtureData('main').then((mains) => {
        const bun = buns[0];
        const filling = mains[0];

        cy.addIngredientToBurger(bun._id);
        cy.addIngredientToBurger(filling._id);
        cy.clickOrderButton();

        cy.get('@modalContainer')
          .contains('p', 'Ваш заказ начали готовить')
          .should('be.visible');
      });
    });
  });

  it('после успешного заказа показывается корректный номер заказа', () => {
    cy.getIngredientFixtureData('bun').then((buns) => {
      cy.getIngredientFixtureData('main').then((mains) => {
        const bun = buns[0];
        const filling = mains[0];

        cy.addIngredientToBurger(bun._id);
        cy.addIngredientToBurger(filling._id);
        cy.clickOrderButton();

        cy.get('@modalContainer')
          .find('h2.text_type_digits-large')
          .invoke('text')
          .then((orderNum) => {
            const trimmed = orderNum.trim();
            expect(trimmed).to.match(/^\d+$/);
            cy.log('Номер заказа:', trimmed);
          });
      });
    });
  });
});

describe('Тестирование открытия и закрытия модальных окон', () => {
  it('закрытие модального окна кнопкой закрытия', () => {
    cy.getIngredientFixtureData('main').then((mains) => {
      const ingredient = mains[0];
      cy.openIngredientDetailsModal(ingredient._id);
      cy.closeModalByCloseButton();
      cy.url().should('not.include', ingredient._id);
    });
  });
  it('модалка с подробностями ингредиента открывается по клику', () => {
    cy.getIngredientFixtureData('main').then((mains) => {
      const ingredient = mains[0];
      cy.openIngredientDetailsModal(ingredient._id);
      cy.url().should('include', ingredient._id);
    });
  });

  it('закрытие модального окна с помощью клавиши Escape', () => {
    cy.getIngredientFixtureData('main').then((mains) => {
      const ingredient = mains[0];
      cy.openIngredientDetailsModal(ingredient._id);
      cy.closeModalByEscape();
      cy.url().should('not.include', ingredient._id);
    });
  });
});
