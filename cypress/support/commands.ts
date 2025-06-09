const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_FIXTURE = 'ingredients.json';
const USERS_FIXTURE = 'logs-of-users.json';
const ORDER_RESPONSE_FIXTURE = 'order-response.json';

// @describe: Перехватчики (interceptors) API-запросов
Cypress.Commands.add('setupInterceptors', () => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: INGREDIENTS_FIXTURE
  }).as('loadIngredients');
  cy.intercept('POST', `${BASE_URL}/auth/login`, { fixture: USERS_FIXTURE });
  cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: USERS_FIXTURE });
  cy.intercept('POST', `${BASE_URL}/orders`, {
    fixture: ORDER_RESPONSE_FIXTURE
  });
});

// @describe: Взаимодействие с элементами UI

// Добавить ингредиент в конструктор по ID
Cypress.Commands.add('addIngredientToBurger', (ingredientId) => {
  cy.get(`[data-cy="${ingredientId}"]`).find('button').click();
});

// Открыть модальное окно с деталями ингредиента
Cypress.Commands.add('openIngredientDetailsModal', (ingredientId) => {
  cy.get(`[data-cy="${ingredientId}"]`).find('a').click();
  cy.get('#modals').as('modalContainer').should('exist').and('not.be.empty');
});

// Закрыть модалку нажатием Escape
Cypress.Commands.add('closeModalByEscape', () => {
  cy.get('body').trigger('keydown', { key: 'Escape' });
  cy.get('@modalContainer').should('be.empty');
});

// Закрыть модалку кнопкой закрытия
Cypress.Commands.add('closeModalByCloseButton', () => {
  cy.get('@modalContainer').find('button').click(); // Кнопка закрытия — первая в модалке
  cy.get('@modalContainer').should('be.empty');
});

// Закрыть модалку кликом по overlay (затемнённый фон)
Cypress.Commands.add('closeModalByOverlayClick', () => {
  cy.get('[data-cy="overlay"]').click({ force: true });
  cy.get('@modalContainer').should('be.empty');
});

// Клик по кнопке оформления заказа
Cypress.Commands.add('clickOrderButton', () => {
  cy.get('[data-cy="order-button"]').click();
});

// @describe: Управление токенами авторизации

// Установка тестовых токенов для авторизации
Cypress.Commands.add('setAuthTokens', () => {
  localStorage.setItem('refreshToken', 'test_refresh');
  cy.setCookie('accessToken', 'test_access');
});

// Очистка токенов и cookies
Cypress.Commands.add('clearAuthTokens', () => {
  localStorage.clear();
  cy.clearCookies();
});

// @describe: Работа с фикстурами ингредиентов

// Получить список ингредиентов по типу из фикстуры
Cypress.Commands.add('getIngredientFixtureData', (type) =>
  cy.fixture(INGREDIENTS_FIXTURE).then(({ data }) => {
    if (type) {
      return data.filter((item) => item.type === type);
    }
    return data;
  })
);