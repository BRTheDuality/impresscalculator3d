// =====================================
// SELEÇÃO DE ELEMENTOS
// =====================================

// Telas principais
const loginScreen = document.getElementById('login-screen');
const appContainer = document.getElementById('app-container');

// Login / Registro
const loginTabBtn = document.getElementById('login-tab-btn');
const registerTabBtn = document.getElementById('register-tab-btn');
const loginBox = document.getElementById('login-box');
const registerBox = document.getElementById('register-box');

const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');

const registerForm = document.getElementById('register-form');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const registerPasswordConfirmInput = document.getElementById('register-password-confirm');

const loggedUserEmailSpan = document.getElementById('logged-user-email');

// Logout
const logoutBtn = document.getElementById('logout-btn');

// Barra de alertas
const alertsBar = document.getElementById('alerts-bar');

// Notificações rápidas (pílulas)
const notifTasksSpan = document.querySelector('#notif-tasks strong');
const notifFinanceSpan = document.querySelector('#notif-finance strong');
const notifCasesSpan = document.querySelector('#notif-cases strong');

// Abas
const tabButtons = document.querySelectorAll('.tab-btn');
const tabScreens = document.querySelectorAll('.tab-screen');

// Dashboard
const dashboardFinanceYearSpan = document.getElementById('dashboard-finance-year');
const dashboardFinanceEntradasSpan = document.getElementById('dashboard-finance-entradas');
const dashboardFinanceSaidasSpan = document.getElementById('dashboard-finance-saidas');
const dashboardFinanceSaldoSpan = document.getElementById('dashboard-finance-saldo');

const dashboardTaskListUl = document.getElementById('dashboard-task-list');

const dashboardClientsTotalSpan = document.getElementById('dashboard-clients-total');
const dashboardClientsAndamentoSpan = document.getElementById('dashboard-clients-andamento');
const dashboardClientsAguardandoSpan = document.getElementById('dashboard-clients-aguardando');
const dashboardClientsEncerradoSpan = document.getElementById('dashboard-clients-encerrado');

const dashboardCalendarDiv = document.getElementById('dashboard-calendar');

// CLIENTES
const clientListUl = document.getElementById('client-list');
const clientListSearchInput = document.getElementById('client-list-search');
const newClientBtn = document.getElementById('new-client-btn');

const clientForm = document.getElementById('client-form');
const clientNameInput = document.getElementById('client-name');
const clientCpfInput = document.getElementById('client-cpf');
const clientPhoneInput = document.getElementById('client-phone');
const clientEmailInput = document.getElementById('client-email');

const clientStreetInput = document.getElementById('client-street');
const clientNumberInput = document.getElementById('client-number');
const clientComplementInput = document.getElementById('client-complement');
const clientNeighborhoodInput = document.getElementById('client-neighborhood');
const clientCityInput = document.getElementById('client-city');
const clientStateInput = document.getElementById('client-state');
const clientCepInput = document.getElementById('client-cep');

const clientCaseTypeInput = document.getElementById('client-case-type');
const clientNotesTextarea = document.getElementById('client-notes');
const clientStatusSelect = document.getElementById('client-status');

const clientDocFileInput = document.getElementById('client-doc-file');
const clientDocDescInput = document.getElementById('client-doc-desc');
const addDocBtn = document.getElementById('add-doc-btn');
const clientDocListUl = document.getElementById('client-doc-list');
const docPreviewMessage = document.getElementById('doc-preview-message');
const docPreviewFrame = document.getElementById('doc-preview-frame');

const deleteClientBtn = document.getElementById('delete-client-btn');

// TAREFAS & PRAZOS
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskClientSelect = document.getElementById('task-client-select');
const taskDueDateInput = document.getElementById('task-due-date');
const taskPrioritySelect = document.getElementById('task-priority');
const taskStatusSelect = document.getElementById('task-status');
const clearTaskFormBtn = document.getElementById('clear-task-form-btn');

const taskFilterStatus = document.getElementById('task-filter-status');
const taskFilterTime = document.getElementById('task-filter-time');
const taskTableBody = document.getElementById('task-table-body');

// FINANCEIRO
const financeForm = document.getElementById('finance-form');
const financeTypeSelect = document.getElementById('finance-type');
const financeDateInput = document.getElementById('finance-date');
const financeDescriptionInput = document.getElementById('finance-description');
const financeClientSelect = document.getElementById('finance-client-select');
const financeValueInput = document.getElementById('finance-value');
const financeStatusSelect = document.getElementById('finance-status');
const clearFinanceFormBtn = document.getElementById('clear-finance-form-btn');

const financeFilterType = document.getElementById('finance-filter-type');
const financeFilterStatus = document.getElementById('finance-filter-status');
const financeFilterYear = document.getElementById('finance-filter-year');
const financeFilterMonth = document.getElementById('finance-filter-month');
const financeTableBody = document.getElementById('finance-table-body');

const summaryEntradasSpan = document.getElementById('summary-entradas');
const summarySaidasSpan = document.getElementById('summary-saidas');
const summarySaldoSpan = document.getElementById('summary-saldo');

// AÇÕES JUDICIAIS
const caseForm = document.getElementById('case-form');
const caseInternalCodeInput = document.getElementById('case-internal-code');
const caseNumberInput = document.getElementById('case-number');
const caseMainClientSelect = document.getElementById('case-main-client');
const caseAuthorInput = document.getElementById('case-author');
const caseDefendantInput = document.getElementById('case-defendant');
const caseTypeInput = document.getElementById('case-type');
const caseCourtInput = document.getElementById('case-court');
const caseStatusSelect = document.getElementById('case-status');
const caseResponsibleInput = document.getElementById('case-responsible');
const caseNotesTextarea = document.getElementById('case-notes');
const clearCaseFormBtn = document.getElementById('clear-case-form-btn');

const caseFilterStatusSelect = document.getElementById('case-filter-status');
const caseFilterClientSelect = document.getElementById('case-filter-client');
const casesTableBody = document.getElementById('cases-table-body');

const casePublicationForm = document.getElementById('case-publication-form');
const pubDateInput = document.getElementById('pub-date');
const pubCodeInput = document.getElementById('pub-code');
const pubTextTextarea = document.getElementById('pub-text');
const pubFileInput = document.getElementById('pub-file');
const casePublicationsBody = document.getElementById('case-publications-body');

// =====================================
// DADOS EM MEMÓRIA
// =====================================

// usuários (apenas e-mail/senha)
let users = [];
let currentUserEmail = null;

// dados globais do escritório (compartilhados por todos os logins)
let clients = [];
let tasks = [];
let finances = [];
let cases = [];

// docs preview temporário
const docPreviewURLs = {};
const pubPreviewURLs = {};

// caso judicial selecionado na lista
let selectedCaseId = null;

// Keys de armazenamento (globais para o escritório, não por usuário)
const STORAGE_USERS = 'lexflow_users_v06';
const STORAGE_CURRENT_USER = 'lexflow_current_user_v06';
const STORAGE_CLIENTS = 'lexflow_clients_v06';
const STORAGE_TASKS = 'lexflow_tasks_v06';
const STORAGE_FINANCES = 'lexflow_finances_v06';
const STORAGE_CASES = 'lexflow_cases_v06';

// =====================================
// FUNÇÕES GERAIS / DATA
// =====================================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function todayISO() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
}

function dateDiffInDays(fromStr, toStr) {
    if (!fromStr || !toStr) return null;
    const from = new Date(fromStr + 'T00:00:00');
    const to = new Date(toStr + 'T00:00:00');
    const diffMs = to - from;
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function getYearFromDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr + 'T00:00:00');
    if (Number.isNaN(d.getTime())) return null;
    return d.getFullYear();
}

function getMonthFromDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr + 'T00:00:00');
    if (Number.isNaN(d.getTime())) return null;
    return d.getMonth() + 1; // 1–12
}

// =====================================
// PERSISTÊNCIA: USUÁRIOS
// =====================================

function loadUsers() {
    const data = localStorage.getItem(STORAGE_USERS);
    if (!data) {
        users = [];
        return;
    }
    try {
        users = JSON.parse(data);
    } catch (e) {
        console.error('Erro ao carregar usuários:', e);
        users = [];
    }
}

function saveUsers() {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function findUserByEmail(email) {
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// =====================================
// PERSISTÊNCIA: DADOS GLOBAIS
// =====================================

function saveClientsToStorage() {
    localStorage.setItem(STORAGE_CLIENTS, JSON.stringify(clients));
}

function loadClientsFromStorage() {
    const data = localStorage.getItem(STORAGE_CLIENTS);
    if (!data) {
        clients = [];
        return;
    }
    try {
        clients = JSON.parse(data);
    } catch (e) {
        console.error('Erro ao carregar clientes:', e);
        clients = [];
    }
}

function saveTasksToStorage() {
    localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const data = localStorage.getItem(STORAGE_TASKS);
    if (!data) {
        tasks = [];
        return;
    }
    try {
        tasks = JSON.parse(data);
    } catch (e) {
        console.error('Erro ao carregar tarefas:', e);
        tasks = [];
    }
}

function saveFinancesToStorage() {
    localStorage.setItem(STORAGE_FINANCES, JSON.stringify(finances));
}

function loadFinancesFromStorage() {
    const data = localStorage.getItem(STORAGE_FINANCES);
    if (!data) {
        finances = [];
        return;
    }
    try {
        finances = JSON.parse(data);
    } catch (e) {
        console.error('Erro ao carregar financeiro:', e);
        finances = [];
    }
}

function saveCasesToStorage() {
    localStorage.setItem(STORAGE_CASES, JSON.stringify(cases));
}

function loadCasesFromStorage() {
    const data = localStorage.getItem(STORAGE_CASES);
    if (!data) {
        cases = [];
        return;
    }
    try {
        cases = JSON.parse(data);
    } catch (e) {
        console.error('Erro ao carregar ações judiciais:', e);
        cases = [];
    }
}

// =====================================
// LOGIN / REGISTRO / LOGOUT
// =====================================

function setLoginTab(isLogin) {
    if (isLogin) {
        loginTabBtn.classList.add('active');
        registerTabBtn.classList.remove('active');
        loginBox.style.display = 'block';
        registerBox.style.display = 'none';
    } else {
        registerTabBtn.classList.add('active');
        loginTabBtn.classList.remove('active');
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
    }
}

loginTabBtn.addEventListener('click', () => setLoginTab(true));
registerTabBtn.addEventListener('click', () => setLoginTab(false));

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = registerEmailInput.value.trim();
    const pass = registerPasswordInput.value.trim();
    const passConf = registerPasswordConfirmInput.value.trim();

    if (!email || !pass || !passConf) {
        alert('Preencha todos os campos.');
        return;
    }
    if (pass.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }
    if (pass !== passConf) {
        alert('As senhas não conferem.');
        return;
    }

    if (findUserByEmail(email)) {
        alert('Já existe um usuário com esse e-mail.');
        return;
    }

    users.push({ email, password: pass });
    saveUsers();

    alert('Conta criada com sucesso! Você já pode entrar.');
    setLoginTab(true);
    loginEmailInput.value = email;
    loginPasswordInput.value = '';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginEmailInput.value.trim();
    const pass = loginPasswordInput.value.trim();

    if (!email || !pass) {
        alert('Informe e-mail e senha.');
        return;
    }

    const user = findUserByEmail(email);
    if (!user || user.password !== pass) {
        alert('E-mail ou senha incorretos.');
        return;
    }

    currentUserEmail = user.email;
    localStorage.setItem(STORAGE_CURRENT_USER, currentUserEmail);
    loginSuccess();
});

function loginSuccess() {
    loggedUserEmailSpan.textContent = currentUserEmail;

    loginScreen.style.display = 'none';
    appContainer.style.display = 'block';

    // Carregar dados globais do escritório
    loadClientsFromStorage();
    loadTasksFromStorage();
    loadFinancesFromStorage();
    loadCasesFromStorage();

    renderClientList();
    refreshClientSelectsForAll();
    refreshFinanceYearFilter();
    renderTasks();
    renderFinances();
    renderCases();
    renderCalendar();
    updateAlertsBar();
    updateDashboardAll();
    updateNotifications();

    showTab('dashboard-tab');
}

logoutBtn.addEventListener('click', () => {
    if (!confirm('Deseja realmente sair?')) return;

    currentUserEmail = null;
    localStorage.removeItem(STORAGE_CURRENT_USER);

    // Volta para tela de login
    appContainer.style.display = 'none';
    loginScreen.style.display = 'block';
    setLoginTab(true);

    // Limpa campos de login (sem mexer nos dados salvos)
    loginEmailInput.value = '';
    loginPasswordInput.value = '';
});

// =====================================
// ABAS
// =====================================

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        showTab(tabId);
    });
});

function showTab(tabId) {
    tabScreens.forEach(screen => {
        screen.style.display = (screen.id === tabId) ? 'block' : 'none';
    });

    // Ao trocar de aba, atualiza alguns painéis
    if (tabId === 'dashboard-tab') {
        updateDashboardAll();
        renderCalendar();
        updateNotifications();
    } else if (tabId === 'clients-tab') {
        renderClientList();
    } else if (tabId === 'tasks-tab') {
        renderTasks();
    } else if (tabId === 'finance-tab') {
        renderFinances();
    } else if (tabId === 'cases-tab') {
        renderCases();
    }
}

// =====================================
// CLIENTES
// =====================================

let selectedClientId = null;

function clearClientForm() {
    clientNameInput.value = '';
    clientCpfInput.value = '';
    clientPhoneInput.value = '';
    clientEmailInput.value = '';

    clientStreetInput.value = '';
    clientNumberInput.value = '';
    clientComplementInput.value = '';
    clientNeighborhoodInput.value = '';
    clientCityInput.value = '';
    clientStateInput.value = '';
    clientCepInput.value = '';

    clientCaseTypeInput.value = '';
    clientNotesTextarea.value = '';
    clientStatusSelect.value = 'andamento';

    clientDocFileInput.value = '';
    clientDocDescInput.value = '';
    clientDocListUl.innerHTML = '';
    docPreviewMessage.textContent = 'Selecione um documento com visualização disponível.';
    docPreviewFrame.style.display = 'none';
    docPreviewFrame.src = '';
}

function fillClientForm(client) {
    clientNameInput.value = client.name || '';
    clientCpfInput.value = client.cpf || '';
    clientPhoneInput.value = client.phone || '';
    clientEmailInput.value = client.email || '';

    clientStreetInput.value = client.address?.street || '';
    clientNumberInput.value = client.address?.number || '';
    clientComplementInput.value = client.address?.complement || '';
    clientNeighborhoodInput.value = client.address?.neighborhood || '';
    clientCityInput.value = client.address?.city || '';
    clientStateInput.value = client.address?.state || '';
    clientCepInput.value = client.address?.cep || '';

    clientCaseTypeInput.value = client.caseType || '';
    clientNotesTextarea.value = client.notes || '';
    clientStatusSelect.value = client.status || 'andamento';

    renderClientDocs(client);
}

function getClientFormData() {
    const data = {
        id: selectedClientId || generateId(),
        name: clientNameInput.value.trim(),
        cpf: clientCpfInput.value.trim(),
        phone: clientPhoneInput.value.trim(),
        email: clientEmailInput.value.trim(),
        address: {
            street: clientStreetInput.value.trim(),
            number: clientNumberInput.value.trim(),
            complement: clientComplementInput.value.trim(),
            neighborhood: clientNeighborhoodInput.value.trim(),
            city: clientCityInput.value.trim(),
            state: clientStateInput.value.trim(),
            cep: clientCepInput.value.trim()
        },
        caseType: clientCaseTypeInput.value.trim(),
        notes: clientNotesTextarea.value.trim(),
        status: clientStatusSelect.value,
        documents: []
    };

    const existing = clients.find(c => c.id === selectedClientId);
    if (existing && existing.documents) data.documents = existing.documents;

    return data;
}

function renderClientList() {
    clientListUl.innerHTML = '';

    // filtro da caixa de busca
    const term = (clientListSearchInput?.value || '').toLowerCase();

    if (!clients.length) {
        const li = document.createElement('li');
        li.textContent = 'Nenhum cliente cadastrado ainda.';
        li.style.fontSize = '13px';
        li.style.color = '#777';
        clientListUl.appendChild(li);
        refreshClientSelectsForAll();
        updateDashboardClients();
        return;
    }

    // ordena alfabeticamente e aplica filtro
    const ordered = [...clients].sort((a, b) => {
        const na = (a.name || '').toLowerCase();
        const nb = (b.name || '').toLowerCase();
        return na.localeCompare(nb);
    }).filter(c => {
        if (!term) return true;
        return (c.name || '').toLowerCase().includes(term);
    });

    if (!ordered.length) {
        const li = document.createElement('li');
        li.textContent = 'Nenhum cliente encontrado com esse nome.';
        li.style.fontSize = '13px';
        li.style.color = '#777';
        clientListUl.appendChild(li);
        refreshClientSelectsForAll();
        updateDashboardClients();
        return;
    }

    ordered.forEach(c => {
        const li = document.createElement('li');
        li.textContent = c.name || '(Sem nome)';
        li.classList.add('client-item');
        li.dataset.id = c.id;
        if (c.id === selectedClientId) li.classList.add('selected');

        li.addEventListener('click', () => selectClient(c.id));
        clientListUl.appendChild(li);
    });

    refreshClientSelectsForAll();
    updateDashboardClients();
}

function selectClient(id) {
    selectedClientId = id;
    const items = document.querySelectorAll('.client-item');
    items.forEach(i => {
        if (i.dataset.id === id) i.classList.add('selected');
        else i.classList.remove('selected');
    });

    const client = clients.find(c => c.id === id);
    if (client) fillClientForm(client);
}

function renderClientDocs(client) {
    clientDocListUl.innerHTML = '';

    if (!client.documents || !client.documents.length) {
        const li = document.createElement('li');
        li.textContent = 'Nenhum documento cadastrado.';
        li.style.fontSize = '13px';
        li.style.color = '#777';
        clientDocListUl.appendChild(li);
        return;
    }

    client.documents.forEach(doc => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = `${doc.description || 'Documento'} - ${doc.fileName || ''}`;

        const btn = document.createElement('button');
        btn.textContent = 'Ver';
        btn.type = 'button';
        btn.addEventListener('click', () => showDocPreview(doc));

        li.appendChild(span);
        li.appendChild(btn);
        clientDocListUl.appendChild(li);
    });
}

function showDocPreview(doc) {
    const url = docPreviewURLs[doc.id];
    if (!url) {
        docPreviewMessage.textContent = 'Documento sem arquivo disponível nesta sessão.';
        docPreviewFrame.style.display = 'none';
        docPreviewFrame.src = '';
        return;
    }

    docPreviewMessage.textContent = `Visualizando: ${doc.description} - ${doc.fileName}`;
    docPreviewFrame.style.display = 'block';
    docPreviewFrame.src = url;
}

// Eventos cliente
clientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!clientNameInput.value.trim()) {
        alert('Nome do cliente é obrigatório.');
        return;
    }

    const data = getClientFormData();
    const idx = clients.findIndex(c => c.id === data.id);

    if (idx >= 0) clients[idx] = data;
    else {
        clients.push(data);
        selectedClientId = data.id;
    }

    saveClientsToStorage();
    renderClientList();
    selectClient(data.id);
    alert('Cliente salvo com sucesso!');
});

newClientBtn.addEventListener('click', () => {
    selectedClientId = null;
    clearClientForm();
    document.querySelectorAll('.client-item').forEach(i => i.classList.remove('selected'));
});

deleteClientBtn.addEventListener('click', () => {
    if (!selectedClientId) {
        alert('Selecione um cliente para excluir.');
        return;
    }
    const client = clients.find(c => c.id === selectedClientId);
    if (!client) return;

    if (!confirm(`Excluir cliente "${client.name}" e seus dados?`)) return;

    // remove cliente
    clients = clients.filter(c => c.id !== selectedClientId);
    selectedClientId = null;
    saveClientsToStorage();

    // opcional: remover vínculos em tarefas / finanças / ações
    tasks = tasks.map(t => ({ ...t, clientId: t.clientId === client.id ? null : t.clientId }));
    finances = finances.map(f => ({ ...f, clientId: f.clientId === client.id ? null : f.clientId }));
    cases = cases.map(cs => ({ ...cs, mainClientId: cs.mainClientId === client.id ? null : cs.mainClientId }));
    saveTasksToStorage();
    saveFinancesToStorage();
    saveCasesToStorage();

    clearClientForm();
    renderClientList();
    refreshClientSelectsForAll();
    renderTasks();
    renderFinances();
    renderCases();
    updateDashboardAll();
});

addDocBtn.addEventListener('click', () => {
    if (!selectedClientId) {
        alert('Selecione um cliente primeiro.');
        return;
    }

    const desc = clientDocDescInput.value.trim();
    const file = clientDocFileInput.files[0];

    if (!desc && !file) {
        alert('Informe uma descrição ou selecione um arquivo.');
        return;
    }

    const client = clients.find(c => c.id === selectedClientId);
    if (!client) return;
    if (!client.documents) client.documents = [];

    const id = generateId();
    const doc = {
        id,
        description: desc || 'Documento',
        fileName: file ? file.name : '(sem arquivo)'
    };

    if (file) {
        const url = URL.createObjectURL(file);
        docPreviewURLs[id] = url;
    }

    client.documents.push(doc);
    saveClientsToStorage();
    renderClientDocs(client);

    clientDocDescInput.value = '';
    clientDocFileInput.value = '';
});

// busca da lista de clientes (esquerda)
if (clientListSearchInput) {
    clientListSearchInput.addEventListener('input', () => {
        renderClientList();
    });
}

// =====================================
// SELECTS DE CLIENTE (Tarefas, Financeiro, Casos)
// =====================================

function populateClientSelect(selectEl, emptyLabel, selectedId) {
    if (!selectEl) return;

    selectEl.innerHTML = '';
    if (emptyLabel) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = emptyLabel;
        selectEl.appendChild(opt);
    }

    const ordered = [...clients].sort((a, b) => {
        const na = (a.name || '').toLowerCase();
        const nb = (b.name || '').toLowerCase();
        return na.localeCompare(nb);
    });

    ordered.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.name || '(Sem nome)';
        if (selectedId && selectedId === c.id) opt.selected = true;
        selectEl.appendChild(opt);
    });
}

function refreshClientSelectsForAll() {
    const taskSelected = taskClientSelect ? taskClientSelect.value : '';
    const finSelected = financeClientSelect ? financeClientSelect.value : '';
    const caseMainSelected = caseMainClientSelect ? caseMainClientSelect.value : '';
    const caseFilterSelected = caseFilterClientSelect ? caseFilterClientSelect.value : 'todos';

    populateClientSelect(
        taskClientSelect,
        '-- Sem cliente vinculado --',
        taskSelected
    );
    populateClientSelect(
        financeClientSelect,
        '-- Não vincular a cliente --',
        finSelected
    );
    populateClientSelect(
        caseMainClientSelect,
        '-- Selecione um cliente --',
        caseMainSelected
    );

    // para o filtro de ações, adiciona "Todos"
    if (caseFilterClientSelect) {
        caseFilterClientSelect.innerHTML = '';
        const optAll = document.createElement('option');
        optAll.value = 'todos';
        optAll.textContent = 'Todos';
        caseFilterClientSelect.appendChild(optAll);

        const ordered = [...clients].sort((a, b) => {
            const na = (a.name || '').toLowerCase();
            const nb = (b.name || '').toLowerCase();
            return na.localeCompare(nb);
        });

        ordered.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.name || '(Sem nome)';
            if (caseFilterSelected === c.id) opt.selected = true;
            caseFilterClientSelect.appendChild(opt);
        });
    }
}

// =====================================
// TAREFAS & PRAZOS
// =====================================

function clearTaskForm() {
    taskTitleInput.value = '';
    if (taskClientSelect) taskClientSelect.value = '';
    taskDueDateInput.value = '';
    taskPrioritySelect.value = 'media';
    taskStatusSelect.value = 'pendente';
}

clearTaskFormBtn.addEventListener('click', clearTaskForm);

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    if (!title) {
        alert('Descrição da tarefa é obrigatória.');
        return;
    }

    const t = {
        id: generateId(),
        title,
        clientId: taskClientSelect ? (taskClientSelect.value || null) : null,
        dueDate: taskDueDateInput.value || '',
        priority: taskPrioritySelect.value,
        status: taskStatusSelect.value,
        createdAt: todayISO(),
        createdBy: currentUserEmail || 'desconhecido'
    };

    tasks.push(t);
    saveTasksToStorage();
    renderTasks();
    updateDashboardTasks();
    updateAlertsBar();
    updateNotifications();
    clearTaskForm();
});

taskFilterStatus.addEventListener('change', renderTasks);
taskFilterTime.addEventListener('change', renderTasks);

function renderTasks() {
    taskTableBody.innerHTML = '';

    if (!tasks.length) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 6;
        td.textContent = 'Nenhuma tarefa cadastrada.';
        td.style.color = '#777';
        td.style.fontSize = '13px';
        tr.appendChild(td);
        taskTableBody.appendChild(tr);
        updateDashboardTasks();
        updateAlertsBar();
        updateNotifications();
        return;
    }

    const statusFilter = taskFilterStatus.value;
    const timeFilter = taskFilterTime.value;
    const today = todayISO();

    tasks.forEach(task => {
        if (statusFilter !== 'todos' && task.status !== statusFilter) return;

        if (timeFilter !== 'todos') {
            if (!task.dueDate) return;
            const diff = dateDiffInDays(today, task.dueDate);
            if (timeFilter === 'hoje' && diff !== 0) return;
            if (timeFilter === '7dias' && (diff < 0 || diff > 7)) return;
            if (timeFilter === 'vencidos' && diff >= 0) return;
        }

        const tr = document.createElement('tr');

        if (task.dueDate) {
            const diff = dateDiffInDays(today, task.dueDate);
            if (diff < 0 && task.status === 'pendente') tr.style.background = '#ffc4c4';
            else if (diff === 0 && task.status === 'pendente') tr.style.background = '#fff5c2';
            else if (diff > 0 && diff <= 7 && task.status === 'pendente') tr.style.background = '#ffe9e9';
        }

        const tdTitle = document.createElement('td');
        // mostra quem criou a tarefa, se diferente de vazio
        const owner = task.createdBy ? ` (por: ${task.createdBy})` : '';
        tdTitle.textContent = task.title + owner;

        const tdClient = document.createElement('td');
        if (task.clientId) {
            const c = clients.find(cl => cl.id === task.clientId);
            tdClient.textContent = c ? c.name : '(Cliente não encontrado)';
        } else tdClient.textContent = '-';

        const tdDue = document.createElement('td');
        tdDue.textContent = task.dueDate || '-';

        const tdPriority = document.createElement('td');
        tdPriority.textContent = task.priority;

        const tdStatus = document.createElement('td');
        tdStatus.textContent = task.status === 'pendente' ? 'Pendente' : 'Concluída';

        const tdActions = document.createElement('td');
        const btnToggle = document.createElement('button');
        btnToggle.textContent = task.status === 'pendente' ? 'Concluir' : 'Reabrir';
        btnToggle.classList.add('task-action-btn');
        btnToggle.addEventListener('click', () => toggleTaskStatus(task.id));

        const btnDel = document.createElement('button');
        btnDel.textContent = 'Excluir';
        btnDel.classList.add('task-action-btn');
        btnDel.addEventListener('click', () => deleteTask(task.id));

        tdActions.appendChild(btnToggle);
        tdActions.appendChild(btnDel);

        tr.appendChild(tdTitle);
        tr.appendChild(tdClient);
        tr.appendChild(tdDue);
        tr.appendChild(tdPriority);
        tr.appendChild(tdStatus);
        tr.appendChild(tdActions);

        taskTableBody.appendChild(tr);
    });

    updateDashboardTasks();
    updateAlertsBar();
    updateNotifications();
}

function toggleTaskStatus(id) {
    const t = tasks.find(task => task.id === id);
    if (!t) return;
    t.status = t.status === 'pendente' ? 'concluida' : 'pendente';
    saveTasksToStorage();
    renderTasks();
}

function deleteTask(id) {
    const t = tasks.find(task => task.id === id);
    if (!t) return;
    if (!confirm(`Excluir tarefa "${t.title}"?`)) return;
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToStorage();
    renderTasks();
}

// =====================================
// FINANCEIRO
// =====================================

function clearFinanceForm() {
    financeTypeSelect.value = 'entrada';
    financeDateInput.value = '';
    financeDescriptionInput.value = '';
    if (financeClientSelect) financeClientSelect.value = '';
    financeValueInput.value = '';
    financeStatusSelect.value = 'pago';
}

clearFinanceFormBtn.addEventListener('click', clearFinanceForm);

financeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const desc = financeDescriptionInput.value.trim();
    if (!desc) {
        alert('Descrição é obrigatória.');
        return;
    }

    const valueStr = financeValueInput.value.replace(',', '.');
    const val = parseFloat(valueStr);
    if (isNaN(val) || val <= 0) {
        alert('Informe um valor válido maior que zero.');
        return;
    }

    const fin = {
        id: generateId(),
        type: financeTypeSelect.value,
        date: financeDateInput.value || todayISO(),
        description: desc,
        clientId: financeClientSelect ? (financeClientSelect.value || null) : null,
        value: val,
        status: financeStatusSelect.value
        // financeiro é global, então não associamos a um usuário específico
    };

    finances.push(fin);
    saveFinancesToStorage();
    refreshFinanceYearFilter();
    renderFinances();
    updateDashboardFinance();
    updateNotifications();
    clearFinanceForm();
});

financeFilterType.addEventListener('change', renderFinances);
financeFilterStatus.addEventListener('change', renderFinances);
if (financeFilterYear) financeFilterYear.addEventListener('change', renderFinances);
if (financeFilterMonth) financeFilterMonth.addEventListener('change', renderFinances);

function refreshFinanceYearFilter() {
    if (!financeFilterYear) return;

    const yearsSet = new Set();
    finances.forEach(f => {
        const y = getYearFromDate(f.date);
        if (y) yearsSet.add(y);
    });

    const currentVal = financeFilterYear.value || 'todos';
    financeFilterYear.innerHTML = '<option value="todos">Todos</option>';

    Array.from(yearsSet).sort((a,b) => b - a).forEach(y => {
        const opt = document.createElement('option');
        opt.value = y.toString();
        opt.textContent = y.toString();
        financeFilterYear.appendChild(opt);
    });

    if (currentVal && currentVal !== 'todos') financeFilterYear.value = currentVal;
}

function renderFinances() {
    financeTableBody.innerHTML = '';

    if (!finances.length) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 6;
        td.textContent = 'Nenhum lançamento cadastrado.';
        td.style.color = '#777';
        td.style.fontSize = '13px';
        tr.appendChild(td);
        financeTableBody.appendChild(tr);
        updateFinanceSummary([]);
        updateDashboardFinance();
        updateNotifications();
        return;
    }

    const typeFilter = financeFilterType.value;
    const statusFilter = financeFilterStatus.value;
    const yearFilter = financeFilterYear ? financeFilterYear.value : 'todos';
    const monthFilter = financeFilterMonth ? financeFilterMonth.value : 'todos';

    const filtered = [];

    finances.forEach(fin => {
        if (typeFilter !== 'todos' && fin.type !== typeFilter) return;
        if (statusFilter !== 'todos' && fin.status !== statusFilter) return;

        const year = getYearFromDate(fin.date);
        if (yearFilter !== 'todos' && year !== parseInt(yearFilter, 10)) return;

        const month = getMonthFromDate(fin.date);
        if (monthFilter !== 'todos' && month !== parseInt(monthFilter, 10)) return;

        filtered.push(fin);

        const tr = document.createElement('tr');

        const tdDate = document.createElement('td');
        tdDate.textContent = fin.date;

        const tdType = document.createElement('td');
        tdType.textContent = fin.type === 'entrada' ? 'Entrada' : 'Saída';

        const tdDesc = document.createElement('td');
        tdDesc.textContent = fin.description;

        const tdClient = document.createElement('td');
        if (fin.clientId) {
            const c = clients.find(cl => cl.id === fin.clientId);
            tdClient.textContent = c ? c.name : '(Cliente não encontrado)';
        } else tdClient.textContent = '-';

        const tdValue = document.createElement('td');
        tdValue.textContent = formatCurrency(fin.value);

        const tdStatus = document.createElement('td');
        tdStatus.textContent = fin.status === 'pago' ? 'Pago' : 'Pendente';

        tr.appendChild(tdDate);
        tr.appendChild(tdType);
        tr.appendChild(tdDesc);
        tr.appendChild(tdClient);
        tr.appendChild(tdValue);
        tr.appendChild(tdStatus);

        financeTableBody.appendChild(tr);
    });

    updateFinanceSummary(filtered);
    updateDashboardFinance();
    updateNotifications();
}

function updateFinanceSummary(list) {
    let entradas = 0;
    let saidas = 0;

    list.forEach(f => {
        if (f.type === 'entrada') entradas += f.value;
        else if (f.type === 'saida') saidas += f.value;
    });

    summaryEntradasSpan.textContent = formatCurrency(entradas);
    summarySaidasSpan.textContent = formatCurrency(saidas);
    summarySaldoSpan.textContent = formatCurrency(entradas - saidas);
}

// =====================================
// AÇÕES JUDICIAIS
// =====================================

function clearCaseForm() {
    caseInternalCodeInput.value = '';
    caseNumberInput.value = '';
    if (caseMainClientSelect) caseMainClientSelect.value = '';
    caseAuthorInput.value = '';
    caseDefendantInput.value = '';
    caseTypeInput.value = '';
    caseCourtInput.value = '';
    caseStatusSelect.value = 'andamento';
    caseNotesTextarea.value = '';
    selectedCaseId = null;

    caseResponsibleInput.value = currentUserEmail || '';
    renderCasePublications(null);
}

clearCaseFormBtn.addEventListener('click', clearCaseForm);

caseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const internalCode = caseInternalCodeInput.value.trim();
    const processNumber = caseNumberInput.value.trim();
    const mainClientId = caseMainClientSelect ? (caseMainClientSelect.value || null) : null;

    if (!internalCode && !processNumber && !mainClientId) {
        alert('Preencha pelo menos código interno, número do processo ou cliente.');
        return;
    }

    const caseData = {
        id: selectedCaseId || generateId(),
        internalCode,
        processNumber,
        mainClientId,
        author: caseAuthorInput.value.trim(),
        defendant: caseDefendantInput.value.trim(),
        caseType: caseTypeInput.value.trim(),
        court: caseCourtInput.value.trim(),
        status: caseStatusSelect.value,
        notes: caseNotesTextarea.value.trim(),
        responsibleEmail: currentUserEmail || 'desconhecido',
        createdAt: todayISO(),
        publications: []
    };

    const existing = cases.find(cs => cs.id === selectedCaseId);
    if (existing && existing.publications) {
        caseData.publications = existing.publications;
    }

    const idx = cases.findIndex(cs => cs.id === caseData.id);
    if (idx >= 0) {
        cases[idx] = caseData;
    } else {
        cases.push(caseData);
        selectedCaseId = caseData.id;
    }

    saveCasesToStorage();
    renderCases();
    alert('Ação judicial salva com sucesso!');
});

function renderCases() {
    casesTableBody.innerHTML = '';

    if (!cases.length) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 7;
        td.textContent = 'Nenhuma ação cadastrada.';
        td.style.color = '#777';
        td.style.fontSize = '13px';
        tr.appendChild(td);
        casesTableBody.appendChild(tr);
        renderCasePublications(null);
        updateNotifications();
        return;
    }

    const statusFilter = caseFilterStatusSelect.value;
    const clientFilter = caseFilterClientSelect ? caseFilterClientSelect.value : 'todos';

    cases.forEach(cs => {
        if (statusFilter !== 'todos' && cs.status !== statusFilter) return;
        if (clientFilter !== 'todos') {
            if (!cs.mainClientId || cs.mainClientId !== clientFilter) return;
        }

        const tr = document.createElement('tr');
        tr.classList.add('case-row');

        const tdCode = document.createElement('td');
        tdCode.textContent = cs.internalCode || '-';

        const tdClient = document.createElement('td');
        if (cs.mainClientId) {
            const c = clients.find(cl => cl.id === cs.mainClientId);
            tdClient.textContent = c ? c.name : '(Cliente não encontrado)';
        } else {
            tdClient.textContent = '-';
        }

        const tdAuthor = document.createElement('td');
        tdAuthor.textContent = cs.author || '-';

        const tdDef = document.createElement('td');
        tdDef.textContent = cs.defendant || '-';

        const tdType = document.createElement('td');
        tdType.textContent = cs.caseType || '-';

        const tdProc = document.createElement('td');
        tdProc.textContent = cs.processNumber || '-';

        const tdStatus = document.createElement('td');
        tdStatus.textContent = 
            cs.status === 'andamento' ? 'Em andamento' :
            cs.status === 'aguardando' ? 'Aguardando audiência / decisão' :
            'Encerrada';

        tr.appendChild(tdCode);
        tr.appendChild(tdClient);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdDef);
        tr.appendChild(tdType);
        tr.appendChild(tdProc);
        tr.appendChild(tdStatus);

        // clique para selecionar ação
        tr.addEventListener('click', () => selectCase(cs.id));

        if (cs.id === selectedCaseId) {
            tr.style.backgroundColor = '#eef2ff';
        }

        casesTableBody.appendChild(tr);
    });

    updateNotifications();
}

function selectCase(id) {
    selectedCaseId = id;
    const cs = cases.find(c => c.id === id);
    if (!cs) return;

    // aplica visual na tabela
    document.querySelectorAll('.case-row').forEach(row => {
        row.style.backgroundColor = '';
    });
    const rows = Array.from(casesTableBody.querySelectorAll('.case-row'));
    const row = rows.find(r => {
        const codeCell = r.firstChild;
        const codeText = codeCell ? codeCell.textContent : '';
        return (cs.internalCode || '-') === codeText;
    });
    if (row) row.style.backgroundColor = '#eef2ff';

    // preenche formulário
    caseInternalCodeInput.value = cs.internalCode || '';
    caseNumberInput.value = cs.processNumber || '';
    if (caseMainClientSelect) caseMainClientSelect.value = cs.mainClientId || '';
    caseAuthorInput.value = cs.author || '';
    caseDefendantInput.value = cs.defendant || '';
    caseTypeInput.value = cs.caseType || '';
    caseCourtInput.value = cs.court || '';
    caseStatusSelect.value = cs.status || 'andamento';
    caseNotesTextarea.value = cs.notes || '';
    caseResponsibleInput.value = cs.responsibleEmail || '';

    renderCasePublications(cs);
}

// Publicações
casePublicationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!selectedCaseId) {
        alert('Selecione uma ação antes de adicionar publicações.');
        return;
    }

    const cs = cases.find(c => c.id === selectedCaseId);
    if (!cs) return;

    const date = pubDateInput.value || todayISO();
    const code = pubCodeInput.value.trim() || '-';
    const text = pubTextTextarea.value.trim() || '(sem texto)';
    const file = pubFileInput.files[0] || null;

    const pub = {
        id: generateId(),
        date,
        code,
        text,
        fileName: file ? file.name : null
    };

    if (!cs.publications) cs.publications = [];
    cs.publications.push(pub);

    // preview PDF (apenas na sessão)
    if (file) {
        const url = URL.createObjectURL(file);
        pubPreviewURLs[pub.id] = url;
    }

    saveCasesToStorage();
    renderCasePublications(cs);
    updateNotifications();

    pubDateInput.value = '';
    pubCodeInput.value = '';
    pubTextTextarea.value = '';
    pubFileInput.value = '';
});

function renderCasePublications(cs) {
    casePublicationsBody.innerHTML = '';

    if (!cs || !cs.publications || !cs.publications.length) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 4;
        td.textContent = 'Nenhuma publicação cadastrada para esta ação.';
        td.style.fontSize = '13px';
        td.style.color = '#777';
        tr.appendChild(td);
        casePublicationsBody.appendChild(tr);
        return;
    }

    cs.publications.forEach(pub => {
        const tr = document.createElement('tr');

        const tdCode = document.createElement('td');
        tdCode.textContent = pub.code || '-';

        const tdDate = document.createElement('td');
        tdDate.textContent = pub.date || '-';

        const tdText = document.createElement('td');
        tdText.textContent = pub.text || '-';

        const tdFile = document.createElement('td');
        if (pub.fileName) {
            const btn = document.createElement('button');
            btn.textContent = 'Ver PDF';
            btn.addEventListener('click', () => {
                const url = pubPreviewURLs[pub.id];
                if (!url) {
                    alert('PDF disponível apenas na sessão em que foi anexado.');
                    return;
                }
                window.open(url, '_blank');
            });
            tdFile.appendChild(btn);
        } else {
            tdFile.textContent = '-';
        }

        tr.appendChild(tdCode);
        tr.appendChild(tdDate);
        tr.appendChild(tdText);
        tr.appendChild(tdFile);

        casePublicationsBody.appendChild(tr);
    });
}

// filtros de ações
caseFilterStatusSelect.addEventListener('change', renderCases);
caseFilterClientSelect.addEventListener('change', renderCases);

// =====================================
// ALERTAS, NOTIFICAÇÕES & DASHBOARD
// =====================================

function updateAlertsBar() {
    const today = todayISO();
    let overdue = 0;
    let todayCount = 0;
    let soon = 0;

    tasks.forEach(t => {
        if (!t.dueDate || t.status !== 'pendente') return;
        const diff = dateDiffInDays(today, t.dueDate);
        if (diff < 0) overdue++;
        else if (diff === 0) todayCount++;
        else if (diff > 0 && diff <= 7) soon++;
    });

    let financePending = 0;
    finances.forEach(f => {
        if (f.status === 'pendente') financePending++;
    });

    let casesWithPub = 0;
    cases.forEach(cs => {
        if (cs.publications && cs.publications.length) casesWithPub++;
    });

    const parts = [];
    if (overdue) parts.push(`${overdue} tarefa(s) vencida(s)`);
    if (todayCount) parts.push(`${todayCount} tarefa(s) para hoje`);
    if (soon) parts.push(`${soon} tarefa(s) nos próximos 7 dias`);
    if (financePending) parts.push(`${financePending} lançamento(s) financeiro(s) pendente(s)`);
    if (casesWithPub) parts.push(`${casesWithPub} ação(ões) com publicação cadastrada`);

    if (!parts.length) {
        alertsBar.textContent = 'Nenhuma tarefa ou pendência urgente. Tudo em dia.';
    } else {
        alertsBar.textContent = 'Atenção: ' + parts.join(' • ');
    }
}

function updateNotifications() {
    // tarefas pendentes (todas, não só do usuário)
    const pendingTasks = tasks.filter(t => t.status === 'pendente').length;
    notifTasksSpan.textContent = pendingTasks.toString();

    // financeiro pendente
    const pendingFinance = finances.filter(f => f.status === 'pendente').length;
    notifFinanceSpan.textContent = pendingFinance.toString();

    // ações com publicações (interpretação de "publicações pendentes")
    let casesWithPub = 0;
    cases.forEach(cs => {
        if (cs.publications && cs.publications.length) casesWithPub++;
    });
    notifCasesSpan.textContent = casesWithPub.toString();
}

function updateDashboardFinance() {
    const currentYear = new Date().getFullYear();
    dashboardFinanceYearSpan.textContent = currentYear.toString();

    let entradas = 0;
    let saidas = 0;

    finances.forEach(f => {
        const year = getYearFromDate(f.date);
        if (year !== currentYear) return;
        if (f.type === 'entrada') entradas += f.value;
        else if (f.type === 'saida') saidas += f.value;
    });

    dashboardFinanceEntradasSpan.textContent = formatCurrency(entradas);
    dashboardFinanceSaidasSpan.textContent = formatCurrency(saidas);
    dashboardFinanceSaldoSpan.textContent = formatCurrency(entradas - saidas);
}

function updateDashboardTasks() {
    dashboardTaskListUl.innerHTML = '';

    if (!tasks.length) {
        const li = document.createElement('li');
        li.textContent = 'Nenhuma tarefa cadastrada.';
        li.style.color = '#777';
        dashboardTaskListUl.appendChild(li);
        return;
    }

    const today = todayISO();
    const pending = tasks.filter(t => t.status === 'pendente' && t.dueDate);

    if (!pending.length) {
        const li = document.createElement('li');
        li.textContent = 'Nenhuma tarefa pendente com prazo.';
        li.style.color = '#777';
        dashboardTaskListUl.appendChild(li);
        return;
    }

    pending.sort((a,b) => (a.dueDate < b.dueDate ? -1 : 1));

    pending.slice(0,5).forEach(t => {
        const li = document.createElement('li');
        const owner = t.createdBy ? ` (por: ${t.createdBy})` : '';
        li.textContent = `${t.dueDate} - ${t.title}${owner}`;
        const diff = dateDiffInDays(today, t.dueDate);
        if (diff < 0) li.style.background = '#ffc4c4';
        else if (diff === 0) li.style.background = '#fff5c2';
        else if (diff > 0 && diff <= 7) li.style.background = '#ffe9e9';
        dashboardTaskListUl.appendChild(li);
    });
}

function updateDashboardClients() {
    const total = clients.length;
    let andamento = 0, aguardando = 0, encerrado = 0;
    clients.forEach(c => {
        if (c.status === 'andamento') andamento++;
        else if (c.status === 'aguardando') aguardando++;
        else if (c.status === 'encerrado') encerrado++;
    });
    dashboardClientsTotalSpan.textContent = total;
    dashboardClientsAndamentoSpan.textContent = andamento;
    dashboardClientsAguardandoSpan.textContent = aguardando;
    dashboardClientsEncerradoSpan.textContent = encerrado;
}

function updateDashboardAll() {
    updateDashboardFinance();
    updateDashboardTasks();
    updateDashboardClients();
}

// =====================================
// CALENDÁRIO (DASHBOARD)
// =====================================

function renderCalendar() {
    if (!dashboardCalendarDiv) return;

    dashboardCalendarDiv.innerHTML = '';

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-11
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const monthName = firstDay.toLocaleString('pt-BR', { month: 'long' });

    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.textContent = `${monthName.toUpperCase()} / ${year}`;
    dashboardCalendarDiv.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    // dias da semana
    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    weekDays.forEach(d => {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.style.fontWeight = 'bold';
        cell.textContent = d;
        grid.appendChild(cell);
    });

    // espaços vazios antes do primeiro dia
    const startWeekday = firstDay.getDay(); // 0-domingo
    for (let i = 0; i < startWeekday; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day';
        empty.textContent = '';
        empty.style.background = 'transparent';
        empty.style.border = 'none';
        grid.appendChild(empty);
    }

    // mapeia dias com prazos de tarefas
    const hasTaskInDay = {};
    tasks.forEach(t => {
        if (!t.dueDate) return;
        const d = new Date(t.dueDate + 'T00:00:00');
        if (d.getMonth() === month && d.getFullYear() === year) {
            const day = d.getDate();
            hasTaskInDay[day] = (hasTaskInDay[day] || 0) + 1;
        }
    });

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.textContent = day;

        if (hasTaskInDay[day]) {
            cell.style.background = '#ffe9e9';
            cell.style.borderColor = '#ff7777';
            cell.title = `${hasTaskInDay[day]} tarefa(s) com prazo neste dia`;
        }

        grid.appendChild(cell);
    }

    dashboardCalendarDiv.appendChild(grid);
}

// =====================================
// INICIALIZAÇÃO
// =====================================

function init() {
    loadUsers();

    // tenta login automático
    const savedUser = localStorage.getItem(STORAGE_CURRENT_USER);
    if (savedUser && findUserByEmail(savedUser)) {
        currentUserEmail = savedUser;
        loginSuccess();
    } else {
        loginScreen.style.display = 'block';
        appContainer.style.display = 'none';
        setLoginTab(true);
    }

    // garante que responsável da ação mostra o usuário atual assim que logar
    if (caseResponsibleInput && currentUserEmail) {
        caseResponsibleInput.value = currentUserEmail;
    }
}

init();
