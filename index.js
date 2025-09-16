// --- CONSTANTS ---

const ICONS = {
  upload: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>`,
  box: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9 text-indigo-600"><path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>`,
  undo: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>`,
  redo: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>`,
print: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7V9h6v3z" clip-rule="evenodd" /></svg>`,
  add: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>`,
  delete: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`,
};

const TAB = {
  CustomerSummary: 'customer_summary',
  ProductSummary: 'product_summary',
  ManageCustomers: 'manage_customers',
  ManageProducts: 'manage_products',
};

const INITIAL_CSV_DATA = `customer_name,parcelSize,product_name,details,unit_price,quantity
ลูกค้า A,M,กางเกงยีนส์,ขากระบอก,1200.00,1
ลูกค้า B,S,ถุงเท้า,ข้อสั้น,150.00,2
ลูกค้า C,L,รองเท้าผ้าใบ,เบอร์ 42,2500.00,1
ลูกค้า A,M,เสื้อยืด,สีขาว,350.00,2
ลูกค้า C,L,เสื้อยืด,สีดำ,350.00,3`;

const LOCAL_STORAGE_KEY = 'csvOrderManagerData';

// --- STATE MANAGEMENT ---

let state = {
  orders: [],
  rawCsv: '',
  history: [],
  redoHistory: [],
  activeTab: TAB.CustomerSummary,
  selectedOrderIds: new Set(),
  selectedProductSummaryItems: new Set(),
  isCsvViewerOpen: false,
  editingOrder: null, // can be order object or null for new
  editingProduct: null, // product object
  editingCustomer: null // customer object
};

function setState(newState, newOptions = {}) {
  const options = { render: true, save: false, history: false, ...newOptions };
  
  const oldState = { ...state };
  if (options.history) {
    const lastHistoryState = oldState.history.length > 0 ? oldState.history[oldState.history.length - 1] : null;
    if (!lastHistoryState || lastHistoryState.rawCsv !== oldState.rawCsv) {
        state.history = [...oldState.history, { orders: oldState.orders, rawCsv: oldState.rawCsv }];
        state.redoHistory = [];
    }
  }
  state = { ...state, ...newState };

  if (options.save) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, state.rawCsv);
    } catch (e) {
      console.error("Could not save to localStorage", e);
    }
  }

  if (options.render) {
    renderApp();
  }
}

// --- BUSINESS LOGIC ---

function parseCsv(csvText) {
  if (!csvText || typeof csvText.trim() !== 'string' || !csvText.trim()) return [];
  const lines = csvText.trim().split('\n');
  const headerLine = lines.shift()?.trim();
  if (!headerLine) return [];
  const header = headerLine.split(',').map(h => h.trim());
  const dataLines = lines.filter(line => line.trim() !== headerLine && line.trim() !== '');

  const rawItems = dataLines.map((line) => {
    const values = line.split(',');
    const item = {};
    header.forEach((key, i) => {
      item[key] = values[i]?.trim() || '';
    });
    return item;
  });

  const groupedByCustomer = rawItems.reduce((acc, item, index) => {
    const customerName = item.customer_name;
    if (!customerName) return acc;

    if (!acc[customerName]) {
      acc[customerName] = {
        id: `customer-${Date.now()}-${Math.random()}`,
        customerName,
        parcelSize: item.parcelSize === '*' ? 'N/A' : item.parcelSize,
        products: [],
      };
    }
    
    const quantity = parseInt(item.quantity, 10);
    const unitPrice = parseFloat(item.unit_price);

    acc[customerName].products.push({
      id: `product-${Date.now()}-${index}`,
      name: item.product_name,
      details: item.details === '*' ? '' : item.details,
      quantity: isNaN(quantity) || item.quantity === '*' ? 1 : quantity,
      unitPrice: isNaN(unitPrice) ? 0 : unitPrice,
    });
    return acc;
  }, {});

  return Object.values(groupedByCustomer);
}

function generateCsv(orders) {
  const header = 'customer_name,parcelSize,product_name,details,unit_price,quantity';
  const rows = orders.flatMap(order => 
    order.products.map(product => 
      [
        order.customerName,
        order.parcelSize,
        product.name,
        product.details || '*',
        product.unitPrice.toFixed(2),
        product.quantity
      ].join(',')
    )
  );
  return [header, ...rows].join('\n');
}

function getUniqueProducts() {
    const productMap = new Map();
    state.orders.forEach(order => {
      order.products.forEach(product => {
        const key = `${product.name}|${product.details}|${product.unitPrice}`;
        if (!productMap.has(key)) {
          productMap.set(key, product);
        }
      });
    });
    return Array.from(productMap.values()).sort((a,b) => a.name.localeCompare(b.name, 'th'));
}

function getUniqueCustomers() {
    const customerMap = new Map();
    state.orders.forEach(order => {
        if (!customerMap.has(order.customerName)) {
            customerMap.set(order.customerName, {
                name: order.customerName,
                parcelSize: order.parcelSize,
            });
        }
    });
    return Array.from(customerMap.values()).sort((a,b) => a.name.localeCompare(b.name, 'th'));
}

function handleUndo() {
  if (state.history.length === 0) return;
  const lastState = state.history[state.history.length - 1];
  const currentState = { orders: state.orders, rawCsv: state.rawCsv };
  
  setState({
    ...lastState,
    history: state.history.slice(0, -1),
    redoHistory: [currentState, ...state.redoHistory]
  }, { save: true });
}

function handleRedo() {
  if (state.redoHistory.length === 0) return;
  const nextState = state.redoHistory[0];
  const currentState = { orders: state.orders, rawCsv: state.rawCsv };

  setState({
    ...nextState,
    history: [...state.history, currentState],
    redoHistory: state.redoHistory.slice(1)
  }, { save: true });
}

function openPrintWindow(htmlContent, title) {
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    } else {
        alert('Please allow pop-ups for this website to print.');
    }
}


// --- RENDERING ---

function renderApp() {
  const root = document.getElementById('root');
  const modalContainer = document.getElementById('modal-container');
  if (!root || !modalContainer) return;
  
  root.innerHTML = `
    <div class="container mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      ${renderHeader()}
      <main class="mt-8">
        ${renderTabs()}
        <div class="mt-6" id="view-container">
          ${renderRawCsvViewer()}
          <div id="tab-content"></div>
        </div>
      </main>
    </div>
  `;
  
  modalContainer.innerHTML = `
    ${state.editingOrder ? renderEditOrderModal() : ''}
    ${state.editingProduct ? renderEditProductModal() : ''}
    ${state.editingCustomer ? renderEditCustomerModal() : ''}
  `;

  renderTabContent();
}

function renderHeader() {
  return `
    <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200">
      <div class="flex items-center gap-3">
        ${ICONS.box}
        <h1 class="text-3xl font-bold text-slate-800">จัดการออเดอร์</h1>
        <span class="text-sm text-slate-400 font-normal">by samaphon</span>
      </div>
      <div class="flex items-center gap-3 mt-4 sm:mt-0">
        <input type="file" accept=".csv" id="file-upload" class="hidden" />
        <button data-action="upload-csv" class="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition">
          ${ICONS.upload} เลือกไฟล์ CSV
        </button>
        <button data-action="download-csv" class="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition">
          ${ICONS.download} ดาวน์โหลด CSV
        </button>
      </div>
    </header>
  `;
}

function renderTabs() {
  const tabItems = [
    { id: TAB.CustomerSummary, label: 'สรุปออเดอร์ลูกค้า' },
    { id: TAB.ProductSummary, label: 'สรุปตามสินค้า' },
    { id: TAB.ManageCustomers, label: 'จัดการลูกค้า' },
    { id: TAB.ManageProducts, label: 'จัดการสินค้า' },
  ];
  return `
    <div class="bg-slate-100 p-1.5 rounded-xl flex items-center gap-2">
      ${tabItems.map(tab => `
        <button data-action="change-tab" data-tab-id="${tab.id}" class="w-full text-center px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
          state.activeTab === tab.id ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'
        }">
          ${tab.label}
        </button>
      `).join('')}
    </div>
  `;
}

function renderRawCsvViewer() {
    return `
    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div data-action="toggle-csv-viewer" class="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
        <span>ข้อมูล CSV ดิบ (Live Sync)</span>
        <div class="flex items-center">
          <button data-action="clear-csv" class="text-sm font-medium text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mr-3 px-2 py-1 rounded-md hover:bg-red-50" ${!state.rawCsv ? 'disabled' : ''}>
            เคลียร์
          </button>
          <span class="transform transition-transform duration-200 ${state.isCsvViewerOpen ? 'rotate-180' : ''}">${ICONS.chevronDown}</span>
        </div>
      </div>
      ${state.isCsvViewerOpen ? `
        <div class="p-4 border-t border-slate-200">
          <textarea id="csv-textarea" class="w-full h-48 p-3 font-mono text-sm text-slate-900 bg-white border border-slate-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="วางข้อมูล CSV ของคุณที่นี่...">${state.rawCsv}</textarea>
        </div>
      ` : ''}
    </div>
  `;
}

function renderTabContent() {
    const container = document.getElementById('tab-content');
    if (!container) return;

    let content = '';
    switch (state.activeTab) {
        case TAB.CustomerSummary:
            content = renderCustomerSummary();
            break;
        case TAB.ProductSummary:
            content = renderProductSummaryView();
            break;
        case TAB.ManageCustomers:
            content = renderManageCustomersView();
            break;
        case TAB.ManageProducts:
            content = renderManageProductsView();
            break;
    }
    container.innerHTML = `<div class="mt-8">${content}</div>`;
}

// --- Customer Summary Tab ---
function renderCustomerSummary() {
    const isAllSelected = state.orders.length > 0 && state.selectedOrderIds.size === state.orders.length;
    return `
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center gap-4">
                <h2 class="text-3xl font-bold text-slate-800">สรุปออเดอร์ลูกค้า</h2>
                <div class="flex items-center gap-3">
                    <button data-action="undo" ${state.history.length === 0 ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        ${ICONS.undo} Undo
                    </button>
                    <button data-action="redo" ${state.redoHistory.length === 0 ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        ${ICONS.redo} Redo
                    </button>
                </div>
            </div>
        </div>
        <div class="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div class="flex items-center gap-4">
                <div class="flex items-center">
                    <div class="relative flex items-center justify-center h-5 w-5">
                        <input id="select-all-orders" type="checkbox" class="sr-only peer" ${isAllSelected ? 'checked' : ''} ${state.orders.length === 0 ? 'disabled' : ''}>
                        <label for="select-all-orders" class="absolute top-0 left-0 h-5 w-5 rounded border-2 transition-colors ${state.orders.length === 0 ? 'bg-slate-100 border-slate-200' : 'bg-white border-slate-300 hover:border-slate-400 peer-checked:border-slate-500 cursor-pointer'}" aria-hidden="true"></label>
                        <span class="absolute text-slate-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">${ICONS.check}</span>
                    </div>
                    <label for="select-all-orders" class="ml-3 text-sm font-medium text-slate-700 ${state.orders.length > 0 ? 'cursor-pointer' : 'cursor-default'}">
                        ${isAllSelected ? 'ยกเลิกการเลือกทั้งหมด' : 'เลือกทั้งหมด'} (${state.selectedOrderIds.size}/${state.orders.length})
                    </label>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <button data-action="print-selected-orders" ${state.selectedOrderIds.size === 0 ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    ${ICONS.print} พิมพ์รายการที่เลือก
                </button>
                <button data-action="open-edit-order" data-order-id="new" class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition">
                    ${ICONS.add} สร้างออเดอร์ใหม่
                </button>
            </div>
        </div>
        <div class="space-y-6">
            ${state.orders.map(renderCustomerOrderCard).join('')}
        </div>
    `;
}

function renderCustomerOrderCard(order) {
    const isSelected = state.selectedOrderIds.has(order.id);
    const total = order.products.reduce((sum, p) => sum + (p.unitPrice * p.quantity), 0);
    return `
        <div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 ${isSelected ? 'shadow-lg ring-2 ring-indigo-500' : 'hover:shadow-lg'}">
            <div class="flex items-start p-6">
                <div class="flex-shrink-0 pt-2">
                    <label class="relative flex items-center justify-center h-5 w-5 cursor-pointer group">
                        <input type="checkbox" data-action="toggle-order-selection" data-order-id="${order.id}" class="sr-only peer" ${isSelected ? 'checked' : ''}>
                        <span class="absolute top-0 left-0 h-5 w-5 rounded bg-white border-2 border-slate-300 group-hover:border-slate-400 peer-checked:border-slate-500 transition-colors" aria-hidden="true"></span>
                        <span class="absolute text-slate-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">${ICONS.check}</span>
                    </label>
                </div>
                <div class="ml-5 flex-grow">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-2xl font-bold text-indigo-600">${order.customerName}</h3>
                            <p class="text-sm text-slate-500 mt-1">Parcel Size: ${order.parcelSize}</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <button data-action="print-order" data-order-id="${order.id}" class="flex items-center gap-2 text-sm text-slate-600 font-semibold hover:text-slate-800 transition">
                                ${ICONS.print} ปริ้น
                            </button>
                            <button data-action="open-edit-order" data-order-id="${order.id}" class="flex items-center gap-2 text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition">
                                ${ICONS.edit} แก้ไข
                            </button>
                        </div>
                    </div>
                    <div class="mt-6 flow-root">
                        <table class="min-w-full divide-y divide-slate-200">
                            <thead class="bg-slate-50">
                                <tr>
                                    <th class="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                                    <th class="px-3 py-3.5 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Qty</th>
                                    <th class="px-3 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Unit Price</th>
                                    <th class="pl-3 pr-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 bg-white">
                                ${order.products.map(p => `
                                    <tr>
                                        <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm">
                                            <div class="font-medium text-slate-900">${p.name}</div>
                                            <div class="text-slate-500">${p.details}</div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500 text-center">${p.quantity}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500 text-right">$${p.unitPrice.toFixed(2)}</td>
                                        <td class="whitespace-nowrap pl-3 pr-6 py-4 text-sm font-medium text-slate-700 text-right">$${(p.quantity * p.unitPrice).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                            <tfoot class="bg-slate-50">
                                <tr>
                                    <th colspan="3" class="py-3 pl-6 pr-3 text-right text-sm font-semibold text-slate-700">Total</th>
                                    <td class="pl-3 pr-6 py-3 text-right text-sm font-semibold text-slate-900">$${total.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- Product Summary Tab ---
function renderProductSummaryView() {
    const productSummary = calculateProductSummary();

    const totalSelectableItems = Object.values(productSummary).reduce((total, productData) => {
        return total + Object.values(productData.variations).reduce((subTotal, variationData) => {
            return subTotal + variationData.customers.length;
        }, 0);
    }, 0);
    
    const isAllSelected = totalSelectableItems > 0 && state.selectedProductSummaryItems.size === totalSelectableItems;
    const sortedProductNames = Object.keys(productSummary).sort((a, b) => a.localeCompare(b, 'th'));

    const header = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-slate-800">สรุปตามสินค้า</h2>
            <div class="flex items-center gap-3">
                <button data-action="undo" ${!state.history.length ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed">${ICONS.undo} Undo</button>
                <button data-action="redo" ${!state.redoHistory.length ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed">${ICONS.redo} Redo</button>
            </div>
        </div>
    `;

    if (sortedProductNames.length === 0) {
        return `${header}
            <div class="text-center py-12 text-slate-500 bg-white rounded-xl shadow-md">
                <h2 class="text-2xl font-bold">ไม่มีข้อมูลสินค้า</h2>
                <p class="mt-2">อัปโหลดไฟล์ CSV หรือเพิ่มออเดอร์เพื่อดูสรุปตามสินค้า</p>
            </div>`;
    }

    return `
        ${header}
        <div class="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div class="flex items-center gap-4">
                <div class="flex items-center">
                    <div class="relative flex items-center justify-center h-5 w-5">
                        <input id="select-all-product-items" type="checkbox" class="sr-only peer" ${isAllSelected ? 'checked' : ''} ${totalSelectableItems === 0 ? 'disabled' : ''}>
                        <label for="select-all-product-items" class="absolute top-0 left-0 h-5 w-5 rounded border-2 transition-colors ${totalSelectableItems === 0 ? 'bg-slate-100 border-slate-200' : 'bg-white border-slate-300 hover:border-slate-400 peer-checked:border-slate-500 cursor-pointer'}" aria-hidden="true"></label>
                        <span class="absolute text-slate-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">${ICONS.check}</span>
                    </div>
                    <label for="select-all-product-items" class="ml-3 text-sm font-medium text-slate-700 ${totalSelectableItems > 0 ? 'cursor-pointer' : 'cursor-default'}">
                        ${isAllSelected ? 'ยกเลิกการเลือก' : 'เลือกทั้งหมด'} (${state.selectedProductSummaryItems.size}/${totalSelectableItems})
                    </label>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <button data-action="print-all-selected-slips" ${state.selectedProductSummaryItems.size === 0 ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition disabled:opacity-50 disabled:cursor-not-allowed">${ICONS.print} พิมพ์รายการที่เลือก</button>
                <button data-action="download-selected-csv" ${state.selectedProductSummaryItems.size === 0 ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition disabled:opacity-50 disabled:cursor-not-allowed">${ICONS.download} ดาวน์โหลด CSV ที่เลือก</button>
            </div>
        </div>

        <div class="space-y-6">
            ${sortedProductNames.map(productName => {
                const productData = productSummary[productName];
                const sortedVariations = Object.keys(productData.variations).sort((a, b) => a.localeCompare(b, 'th'));
                return `
                    <div class="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                        <div class="p-6">
                            <div class="flex justify-between items-start">
                                <div class="flex-grow">
                                    <h3 class="text-xl font-bold text-indigo-600">${productName}</h3>
                                    <p class="text-sm text-slate-600 font-semibold mt-1">Total Quantity: <span class="text-slate-900 font-bold">${productData.totalQuantity}</span></p>
                                </div>
                                <button data-action="print-product-summary" data-product-name="${productName}" class="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 text-sm shrink-0 ml-4">${ICONS.print} พิมพ์</button>
                            </div>
                            <div class="mt-4">
                                ${sortedVariations.map((variationName, index) => {
                                    const variationData = productData.variations[variationName];
                                    return `
                                        <div class="py-4 ${index > 0 ? 'border-t border-slate-200' : ''}">
                                            <div class="flex justify-between items-start">
                                                <h4 class="text-md font-semibold text-slate-700">${variationName}</h4>
                                                <p class="text-sm text-slate-500 text-right shrink-0 ml-4">Subtotal: <span class="font-medium text-slate-700">${variationData.subtotal}</span></p>
                                            </div>
                                            <div class="mt-2 pl-2 space-y-1">
                                                ${variationData.customers.map((customer, custIndex) => {
                                                    const key = `${productName}|${variationName}|${customer.customerName}|${custIndex}`;
                                                    const isSelected = state.selectedProductSummaryItems.has(key);
                                                    return `
                                                        <div class="flex items-center text-sm text-slate-600">
                                                            <label for="${key}" class="relative flex items-center justify-center h-5 w-5 mr-3 cursor-pointer group shrink-0">
                                                                <input id="${key}" type="checkbox" data-action="toggle-product-summary-item" data-key="${key}" class="sr-only peer" ${isSelected ? 'checked' : ''}>
                                                                <span class="absolute top-0 left-0 h-5 w-5 rounded bg-white border-2 border-slate-300 group-hover:border-slate-400 peer-checked:border-slate-500 transition-colors" aria-hidden="true"></span>
                                                                <span class="absolute text-slate-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">${ICONS.check}</span>
                                                            </label>
                                                            <label for="${key}" class="cursor-pointer select-none">${customer.customerName} - Qty: ${customer.quantity}</label>
                                                        </div>`;
                                                }).join('')}
                                            </div>
                                        </div>`;
                                }).join('')}
                            </div>
                        </div>
                    </div>`;
            }).join('')}
        </div>
    `;
}

// --- Manage Customers Tab ---
function renderManageCustomersView() {
    const uniqueCustomers = getUniqueCustomers();
    const header = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-slate-800">จัดการลูกค้า</h2>
            <div class="flex items-center gap-3">
                <button data-action="undo" ${!state.history.length ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed">${ICONS.undo} Undo</button>
                <button data-action="redo" ${!state.redoHistory.length ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed">${ICONS.redo} Redo</button>
            </div>
        </div>`;

    if (uniqueCustomers.length === 0) {
        return `${header}
            <div class="py-12 text-center bg-white rounded-xl shadow-md">
                <h2 class="text-2xl font-bold text-slate-700">ไม่มีข้อมูลลูกค้า</h2>
                <p class="text-slate-500 mt-2">อัปโหลดไฟล์ CSV หรือสร้างออเดอร์เพื่อดูรายการลูกค้า</p>
            </div>`;
    }

    return `
        ${header}
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <table class="min-w-full divide-y divide-slate-200">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-slate-600">ชื่อลูกค้า</th>
                        <th class="px-3 py-3.5 text-center text-sm font-semibold text-slate-600">Parcel Size</th>
                        <th class="relative py-3.5 pl-3 pr-6"><span class="sr-only">การดำเนินการ</span></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 bg-white">
                    ${uniqueCustomers.map(customer => `
                        <tr>
                            <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-slate-900">${customer.name}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500 text-center">${customer.parcelSize || '-'}</td>
                            <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                                <button data-action="open-edit-customer" data-customer-name="${customer.name}" class="flex items-center gap-1 text-indigo-600 hover:text-indigo-900">${ICONS.edit} แก้ไข</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>`;
}

// --- Manage Products Tab ---
function renderManageProductsView() {
    const uniqueProducts = getUniqueProducts();
    const header = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-slate-800">จัดการสินค้า</h2>
            <div class="flex items-center gap-3">
                <button data-action="undo" ${!state.history.length ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed">${ICONS.undo} Undo</button>
                <button data-action="redo" ${!state.redoHistory.length ? 'disabled' : ''} class="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed">${ICONS.redo} Redo</button>
            </div>
        </div>`;

    if (uniqueProducts.length === 0) {
        return `${header}
            <div class="py-12 text-center bg-white rounded-xl shadow-md">
                <h2 class="text-2xl font-bold text-slate-700">ไม่มีข้อมูลสินค้า</h2>
                <p class="text-slate-500 mt-2">อัปโหลดไฟล์ CSV หรือสร้างออเดอร์เพื่อดูรายการสินค้า</p>
            </div>`;
    }

    return `
        ${header}
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <table class="min-w-full divide-y divide-slate-200">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-slate-600">ชื่อสินค้า</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-slate-600">รายละเอียด</th>
                        <th class="pl-3 pr-6 py-3.5 text-right text-sm font-semibold text-slate-600">ราคาต่อหน่วย</th>
                        <th class="relative py-3.5 pl-3 pr-6"><span class="sr-only">การดำเนินการ</span></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 bg-white">
                    ${uniqueProducts.map(product => `
                        <tr>
                            <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-slate-900">${product.name}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500">${product.details || '-'}</td>
                            <td class="whitespace-nowrap pl-3 pr-6 py-4 text-sm text-slate-500 text-right">$${product.unitPrice.toFixed(2)}</td>
                            <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                                <button data-action="open-edit-product" data-product-id="${product.id}" class="flex items-center gap-1 text-indigo-600 hover:text-indigo-900">${ICONS.edit} แก้ไข</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>`;
}

// --- MODALS ---
function renderEditOrderModal() {
    const order = state.editingOrder;
    const isNew = !order.id;
    const allProducts = getUniqueProducts();
    const uniqueProductNames = Array.from(new Set(allProducts.map(p => p.name))).sort((a, b) => a.localeCompare(b, 'th'));

    return `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div class="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 class="text-2xl font-bold text-slate-800">${isNew ? 'สร้างออเดอร์ใหม่' : 'แก้ไขออเดอร์'}</h2>
          <button data-action="close-modal" class="text-slate-400 hover:text-slate-600">${ICONS.close}</button>
        </div>
        <form id="edit-order-form" class="flex-grow overflow-y-auto p-6 space-y-6">
          <input type="hidden" name="id" value="${order.id || ''}" />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="customerName" class="block text-sm font-medium text-slate-700">ชื่อลูกค้า</label>
              <input type="text" name="customerName" value="${order.customerName || ''}" class="mt-1 block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label for="parcelSize" class="block text-sm font-medium text-slate-700">Parcel Size</label>
              <input type="text" name="parcelSize" value="${order.parcelSize || ''}" class="mt-1 block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md shadow-sm" />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-800 mb-2">สินค้า</h3>
            <div id="modal-products-container" class="space-y-4">
              ${(order.products || []).map((p, i) => renderModalProductItem(p, i, uniqueProductNames)).join('')}
            </div>
            <datalist id="product-list">${uniqueProductNames.map(name => `<option value="${name}"></option>`).join('')}</datalist>
            <div class="mt-4 flex items-center gap-4">
                <button type="button" data-action="add-modal-product" data-is-select="false" class="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">${ICONS.add} พิมพ์เพิ่มสินค้า</button>
                <button type="button" data-action="add-modal-product" data-is-select="true" class="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">${ICONS.add} เลือกเพิ่มสินค้า</button>
            </div>
          </div>
        </form>
        <div class="flex justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <button type="button" data-action="close-modal" class="px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">ยกเลิก</button>
          <button type="button" data-action="save-order" class="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">บันทึก</button>
        </div>
      </div>
    </div>`;
}

function renderModalProductItem(product, index, uniqueProductNames, isSelect = false) {
    const nameInput = isSelect
        ? `<select name="products[${index}][name]" class="mt-1 w-full px-3 py-2 text-sm bg-white text-slate-900 border border-slate-300 rounded-md shadow-sm h-10" required>
            <option value="" disabled ${!product.name ? 'selected' : ''}>-- เลือกสินค้า --</option>
            ${uniqueProductNames.map(name => `<option value="${name}" ${product.name === name ? 'selected' : ''}>${name}</option>`).join('')}
           </select>`
        : `<input list="product-list" type="text" name="products[${index}][name]" value="${product.name}" class="mt-1 w-full px-3 py-2 text-sm bg-white text-slate-900 border border-slate-300 rounded-md shadow-sm h-10" required />`;
    
    return `
    <div class="grid grid-cols-12 gap-3 items-end p-4 bg-slate-50 rounded-lg border border-slate-200 product-item">
      <input type="hidden" name="products[${index}][id]" value="${product.id}">
      <input type="hidden" name="products[${index}][isSelect]" value="${isSelect}">
      <div class="col-span-12 sm:col-span-4">
        <label class="block text-xs font-medium text-slate-600">Product Name</label>
        ${nameInput}
      </div>
      <div class="col-span-12 sm:col-span-3">
        <label class="block text-xs font-medium text-slate-600">Details</label>
        <input type="text" name="products[${index}][details]" value="${product.details}" class="mt-1 w-full px-3 py-2 text-sm bg-white text-slate-900 border border-slate-300 rounded-md shadow-sm h-10">
      </div>
      <div class="col-span-4 sm:col-span-2">
        <label class="block text-xs font-medium text-slate-600">Qty</label>
        <input type="number" name="products[${index}][quantity]" value="${product.quantity}" class="mt-1 w-full px-3 py-2 text-sm bg-white text-slate-900 border border-slate-300 rounded-md text-right h-10">
      </div>
      <div class="col-span-5 sm:col-span-2">
        <label class="block text-xs font-medium text-slate-600">Price</label>
        <input type="number" step="0.01" name="products[${index}][unitPrice]" value="${product.unitPrice}" class="mt-1 w-full px-3 py-2 text-sm bg-white text-slate-900 border border-slate-300 rounded-md text-right h-10">
      </div>
      <div class="col-span-3 sm:col-span-1 text-right">
        <button type="button" data-action="remove-modal-product" class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100">${ICONS.delete}</button>
      </div>
    </div>`;
}

function renderEditProductModal() {
    const product = state.editingProduct;
    return `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col">
        <div class="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 class="text-2xl font-bold text-slate-800">แก้ไขสินค้า</h2>
          <button data-action="close-modal" class="text-slate-400 hover:text-slate-600">${ICONS.close}</button>
        </div>
        <form id="edit-product-form">
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700">ชื่อสินค้า</label>
              <input type="text" name="name" value="${product.name}" class="mt-1 block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700">รายละเอียด</label>
              <input type="text" name="details" value="${product.details}" class="mt-1 block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700">ราคาต่อหน่วย</label>
              <div class="relative mt-1"><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span class="text-slate-500 sm:text-sm">$</span></div>
                <input type="number" name="unitPrice" step="0.01" value="${product.unitPrice}" class="block w-full pl-7 pr-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md" required />
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            <button type="button" data-action="close-modal" class="px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">ยกเลิก</button>
            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">บันทึก</button>
          </div>
        </form>
      </div>
    </div>`;
}

function renderEditCustomerModal() {
    const customer = state.editingCustomer;
     return `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col">
        <div class="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 class="text-2xl font-bold text-slate-800">แก้ไขข้อมูลลูกค้า</h2>
          <button data-action="close-modal" class="text-slate-400 hover:text-slate-600">${ICONS.close}</button>
        </div>
        <form id="edit-customer-form">
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700">ชื่อลูกค้า</label>
              <input type="text" name="name" value="${customer.name}" class="mt-1 block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700">Parcel Size</label>
              <input type="text" name="parcelSize" value="${customer.parcelSize}" class="mt-1 block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md" />
            </div>
          </div>
          <div class="flex justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            <button type="button" data-action="close-modal" class="px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50">ยกเลิก</button>
            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">บันทึก</button>
          </div>
        </form>
      </div>
    </div>`;
}

// --- EVENT HANDLERS & INITIALIZATION ---

function setupEventListeners() {
    document.body.addEventListener('click', handleGlobalClick);
    document.body.addEventListener('change', handleGlobalChange);
    document.body.addEventListener('input', handleGlobalInput);
    document.body.addEventListener('submit', handleGlobalSubmit);
}

function handleGlobalClick(e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    
    switch(action) {
        case 'upload-csv': document.getElementById('file-upload').click(); break;
        case 'download-csv': handleDownloadCsv(); break;
        case 'change-tab': setState({ activeTab: target.dataset.tabId }); break;
        case 'toggle-csv-viewer': setState({ isCsvViewerOpen: !state.isCsvViewerOpen }); break;
        case 'clear-csv': setState({ rawCsv: '', orders: [] }, { history: true, save: true }); break;
        case 'undo': handleUndo(); break;
        case 'redo': handleRedo(); break;
        case 'open-edit-order': handleOpenEditOrderModal(target.dataset.orderId); break;
        case 'open-edit-product': handleOpenEditProductModal(target.dataset.productId); break;
        case 'open-edit-customer': handleOpenEditCustomerModal(target.dataset.customerName); break;
        case 'close-modal': closeAllModals(); break;
        case 'add-modal-product': handleAddModalProduct(target.dataset.isSelect === 'true'); break;
        case 'remove-modal-product': target.closest('.product-item').remove(); break;
        case 'print-order': handlePrintOrder(target.dataset.orderId); break;
        case 'print-selected-orders': handlePrintSelectedOrders(); break;
        case 'print-product-summary': handlePrintProductSummary(target.dataset.productName); break;
        case 'print-all-selected-slips': handlePrintAllSelectedSlips(); break;
        case 'download-selected-csv': handleDownloadSelectedCsv(); break;
        case 'save-order': {
            const form = document.getElementById('edit-order-form');
            if (form) {
                if (form.checkValidity()) {
                    handleSaveOrder(form);
                } else {
                    form.reportValidity();
                }
            }
            break;
        }
    }
}

function handleGlobalChange(e) {
    const target = e.target;
    if (target.id === 'file-upload') handleFileChange(e);
    else if (target.id === 'select-all-orders') handleToggleSelectAllOrders(target.checked);
    else if (target.id === 'select-all-product-items') handleToggleSelectAllProductItems(target.checked);
    else if (target.matches('[data-action="toggle-order-selection"]')) handleToggleOrderSelection(target.dataset.orderId);
    else if (target.matches('[data-action="toggle-product-summary-item"]')) handleToggleProductSummaryItem(target.dataset.key);
    else if (target.closest('#edit-order-form') && target.name.endsWith('[name]')) handleModalProductNameChange(target);
}

function handleGlobalInput(e) {
    if (e.target.id === 'csv-textarea') {
        const csvText = e.target.value;
        const newOrders = parseCsv(csvText);
        // Use setState to update state without re-rendering to prevent race conditions
        // with other state-updating actions, like saving from a modal.
        // The final save and render will happen on 'focusout'.
        setState({ rawCsv: csvText, orders: newOrders }, { render: false, save: false });
    }
}

function handleGlobalSubmit(e) {
    e.preventDefault();
    if (e.target.id === 'edit-product-form') handleSaveProduct(e.target);
    else if (e.target.id === 'edit-customer-form') handleSaveCustomer(e.target);
}

function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        setState({ rawCsv: text, orders: parseCsv(text) }, { history: true, save: true });
      };
      reader.readAsText(file);
    }
}

function handleDownloadCsv() {
    const csvContent = generateCsv(state.orders);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'orders_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- MODAL & FORM LOGIC ---
function closeAllModals() {
    setState({ editingOrder: null, editingCustomer: null, editingProduct: null });
}

function handleOpenEditOrderModal(orderId) {
    if (orderId === 'new') {
        setState({ editingOrder: { customerName: '', parcelSize: '', products: [{id: `product-${Date.now()}`, name: '', details: '', quantity: '1', unitPrice: '0'}] } });
    } else {
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
            // Deep copy to avoid modifying state directly
            setState({ editingOrder: JSON.parse(JSON.stringify(order)) });
        }
    }
}

function handleOpenEditProductModal(productId) {
    const product = state.orders.flatMap(o => o.products).find(p => p.id === productId);
    if (product) {
        setState({ editingProduct: {...product} });
    }
}

function handleOpenEditCustomerModal(customerName) {
    const customer = getUniqueCustomers().find(c => c.name === customerName);
    if (customer) {
        setState({ editingCustomer: {...customer} });
    }
}

function handleAddModalProduct(isSelect) {
    const container = document.getElementById('modal-products-container');
    if (!container) return;
    const index = container.children.length;
    const allProducts = getUniqueProducts();
    const uniqueProductNames = Array.from(new Set(allProducts.map(p => p.name))).sort((a, b) => a.localeCompare(b, 'th'));
    const newProductHtml = renderModalProductItem(
        { id: `product-${Date.now()}`, name: '', details: '', quantity: '1', unitPrice: '0' },
        index,
        uniqueProductNames,
        isSelect
    );
    container.insertAdjacentHTML('beforeend', newProductHtml);
}

function handleModalProductNameChange(inputElement) {
    const newName = inputElement.value;
    const productItemDiv = inputElement.closest('.product-item');
    if (!productItemDiv) return;

    const matchedProduct = getUniqueProducts().find(p => p.name === newName);
    if (matchedProduct) {
        const detailsInput = productItemDiv.querySelector('input[name*="[details]"]');
        const priceInput = productItemDiv.querySelector('input[name*="[unitPrice]"]');
        if (detailsInput) detailsInput.value = matchedProduct.details;
        if (priceInput) priceInput.value = matchedProduct.unitPrice;
    }
}

function handleSaveOrder(form) {
    const originalOrder = state.editingOrder;
    const formData = new FormData(form);
    const orderData = {
        id: formData.get('id') || `customer-${Date.now()}-${Math.random()}`,
        customerName: formData.get('customerName'),
        parcelSize: formData.get('parcelSize'),
        products: []
    };

    const productIndices = [...new Set([...formData.keys()].filter(k => k.startsWith('products['))
        .map(k => k.match(/\[(\d+)\]/)[1]))];

    productIndices.forEach(index => {
        orderData.products.push({
            id: formData.get(`products[${index}][id]`),
            name: formData.get(`products[${index}][name]`),
            details: formData.get(`products[${index}][details]`),
            quantity: parseInt(formData.get(`products[${index}][quantity]`), 10) || 0,
            unitPrice: parseFloat(formData.get(`products[${index}][unitPrice]`)) || 0,
        });
    });

    let currentOrders = [...state.orders];
    const isExistingOrder = originalOrder && originalOrder.id;

    if (isExistingOrder) {
        // Find the specific order by its ID and replace it with the new data.
        const index = currentOrders.findIndex(o => o.id === orderData.id);
        if (index > -1) {
            currentOrders[index] = orderData;
        }
    } else {
        currentOrders.push(orderData);
    }
    
    setState({
        orders: currentOrders,
        rawCsv: generateCsv(currentOrders),
        editingOrder: null
    }, { history: true, save: true });
}

function handleSaveProduct(form) {
    const originalProduct = state.editingProduct;
    if (!originalProduct) return;
    
    const formData = new FormData(form);
    const updatedProductData = {
        name: formData.get('name'),
        details: formData.get('details'),
        unitPrice: parseFloat(formData.get('unitPrice')) || 0,
    };

    const updatedOrders = state.orders.map(order => ({
        ...order,
        products: order.products.map(p => {
            if (p.name === originalProduct.name && p.details === originalProduct.details && p.unitPrice === originalProduct.unitPrice) {
                return { ...p, ...updatedProductData };
            }
            return p;
        })
    }));

    setState({
        orders: updatedOrders,
        rawCsv: generateCsv(updatedOrders),
        editingProduct: null
    }, { history: true, save: true });
}

function handleSaveCustomer(form) {
    const originalCustomer = state.editingCustomer;
    if (!originalCustomer) return;

    const formData = new FormData(form);
    const updatedCustomerData = {
        name: formData.get('name'),
        parcelSize: formData.get('parcelSize'),
    };
    
    const updatedOrders = state.orders.map(order => {
        if (order.customerName === originalCustomer.name) {
            return { ...order, customerName: updatedCustomerData.name, parcelSize: updatedCustomerData.parcelSize };
        }
        return order;
    });

    setState({
        orders: updatedOrders,
        rawCsv: generateCsv(updatedOrders),
        editingCustomer: null
    }, { history: true, save: true });
}


// --- SELECTION LOGIC ---
function handleToggleSelectAllOrders(isChecked) {
    setState({ selectedOrderIds: isChecked ? new Set(state.orders.map(o => o.id)) : new Set() });
}

function handleToggleOrderSelection(orderId) {
    const newSelection = new Set(state.selectedOrderIds);
    if (newSelection.has(orderId)) {
        newSelection.delete(orderId);
    } else {
        newSelection.add(orderId);
    }
    setState({ selectedOrderIds: newSelection });
}

function handleToggleSelectAllProductItems(isChecked) {
    if (!isChecked) {
        setState({ selectedProductSummaryItems: new Set() });
        return;
    }
    const allCustomerKeys = new Set();
    const productSummary = calculateProductSummary();
    Object.entries(productSummary).forEach(([productName, productData]) => {
        Object.entries(productData.variations).forEach(([variationName, variationData]) => {
            variationData.customers.forEach((customer, custIndex) => {
                allCustomerKeys.add(`${productName}|${variationName}|${customer.customerName}|${custIndex}`);
            });
        });
    });
    setState({ selectedProductSummaryItems: allCustomerKeys });
}

function handleToggleProductSummaryItem(key) {
    const newSelection = new Set(state.selectedProductSummaryItems);
    if (newSelection.has(key)) {
        newSelection.delete(key);
    } else {
        newSelection.add(key);
    }
    setState({ selectedProductSummaryItems: newSelection });
}

// --- PRINTING AND EXPORTING ---

function handlePrintOrder(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    const printContent = `
      <html>
        <head>
          <title>Order - ${order.customerName}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
              margin: 0.2rem; 
              color: #1E293B;
            }
            .customer-name { font-size: 1.875rem; font-weight: 700; color: #4338CA; margin: 0; }
            .parcel-size { font-size: 1rem; color: #64748B; margin-top: 0.25rem; }
            table { width: 100%; border-collapse: collapse; margin-top: 2rem; }
            th, td { padding: 0.75rem 0.5rem; text-align: left; vertical-align: top; border-bottom: 1px solid #E2E8F0; }
            th { font-weight: 500; color: #64748B; text-transform: none; font-size: 10px; }
            td { font-size: 10px; }
            .product-name { word-break: break-word; }
            .product-details { font-size: 8px; color: #64748B; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            @media print { body { margin: 0.2rem; } }
          </style>
        </head>
        <body>
          <h1 class="customer-name">${order.customerName}</h1>
          <p class="parcel-size">Parcel Size: ${order.parcelSize}</p>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th class="text-center">Qty</th>
                <th class="text-right">Price</th>
                <th class="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${order.products.map(product => `
                <tr>
                  <td>
                    <div class="product-name">${product.name}</div>
                    ${product.details ? `<div class="product-details">${product.details}</div>` : ''}
                  </td>
                  <td class="text-center">${product.quantity}</td>
                  <td class="text-right">$${product.unitPrice.toFixed(2)}</td>
                  <td class="text-right">$${(product.quantity * product.unitPrice).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div style="border-top: 1px dashed #E2E8F0; margin-top: 1rem;"></div>
        </body>
      </html>`;
    openPrintWindow(printContent, `Order - ${order.customerName}`);
}

function generatePrintContentForMultipleOrders(ordersToPrint) {
    const singleOrderCardFragment = (order) => `
      <div class="order-card">
        <h1 class="customer-name">${order.customerName}</h1>
        <p class="parcel-size">Parcel Size: ${order.parcelSize}</p>
        <div class="separator"></div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th class="text-center">Qty</th>
              <th class="text-right">Price</th>
              <th class="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${order.products.map(product => `
              <tr>
                <td>
                  <div class="product-name">${product.name}</div>
                  ${product.details ? `<div class="product-details">${product.details}</div>` : ''}
                </td>
                <td class="text-center">${product.quantity}</td>
                <td class="text-right">$${product.unitPrice.toFixed(2)}</td>
                <td class="text-right">$${(product.quantity * product.unitPrice).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    const isMultiColumn = ordersToPrint.length > 1;

    let ordersHtml = '';
    if (isMultiColumn) {
      let rowsHtml = '';
      for (let i = 0; i < ordersToPrint.length; i += 2) {
        const order1 = ordersToPrint[i];
        const order2 = ordersToPrint[i + 1];
        rowsHtml += `
          <div class="print-row">
            <div class="print-col">${singleOrderCardFragment(order1)}</div>
            <div class="print-col">${order2 ? singleOrderCardFragment(order2) : ''}</div>
          </div>
        `;
      }
      ordersHtml = `<div class="print-container">${rowsHtml}</div>`;
    } else if (ordersToPrint.length === 1) {
        ordersHtml = `<div class="print-container">${singleOrderCardFragment(ordersToPrint[0])}</div><div style="border-top: 1px dashed #d1d5db; margin-top: 1rem;"></div>`;
    }

    return `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Customer Orders</title>
          <style>
            @media print { body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
            body { font-family: sans-serif; margin: 0.2rem; color: #111827; background-color: white; }
            ${isMultiColumn ? `
            .print-container .print-row { display: flex; border-bottom: 1px dashed #d1d5db; }
            .print-container .print-col { box-sizing: border-box; flex: 1 1 50%; min-width: 0; padding: 1rem 2.5rem; }
            .print-container .print-col:first-child { border-right: 1px dashed #d1d5db; }
            ` : `.print-container .order-card { padding: 1rem; }`}
            .order-card { box-sizing: border-box; break-inside: avoid; page-break-inside: avoid; }
            .customer-name { font-size: 1.25rem; font-weight: 700; color: #4338ca; margin: 0; }
            .parcel-size { font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; margin-bottom: 0.75rem; }
            .separator { border-top: 1px solid #e5e7eb; margin-bottom: 0.75rem; }
            table { width: 100%; border-collapse: collapse; font-size: 10px; }
            th, td { padding: 0.25rem 0.4rem; text-align: left; vertical-align: top; }
            thead th { padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb; }
            th { font-weight: 500; color: #6b7280; font-size: 10px; }
            .product-name { color: #111827; word-break: break-word; }
            .product-details { font-size: 8px; color: #6b7280; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
          </style>
        </head>
        <body>${ordersHtml}</body>
      </html>`;
}

function handlePrintSelectedOrders() {
    const ordersToPrint = state.orders.filter(o => state.selectedOrderIds.has(o.id));
    if (ordersToPrint.length === 0) {
        alert("Please select at least one order to print.");
        return;
    }
    const printContent = generatePrintContentForMultipleOrders(ordersToPrint);
    openPrintWindow(printContent, 'Selected Customer Orders');
}

function calculateProductSummary() {
    return state.orders.reduce((acc, order) => {
        order.products.forEach(product => {
            const { name, details, quantity } = product;
            if (!acc[name]) {
                acc[name] = { totalQuantity: 0, variations: {} };
            }
            const detailKey = details || 'N/A';
            if (!acc[name].variations[detailKey]) {
                acc[name].variations[detailKey] = { subtotal: 0, customers: [] };
            }
            acc[name].totalQuantity += quantity;
            acc[name].variations[detailKey].subtotal += quantity;
            acc[name].variations[detailKey].customers.push({ customerName: order.customerName, quantity });
        });
        return acc;
    }, {});
}

function generateProductSummaryPrintPage(htmlContent, title) {
    const fullHtml = `
      <html>
          <head>
              <title>${title}</title>
              <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 2px; color: #1E293B; }
                  .print-container { width: 100%; display: flex; flex-direction: column; }
                  .print-row { display: flex; border-bottom: 1px dashed #94a3b8; page-break-inside: avoid; break-inside: avoid; }
                  .print-col { flex: 1 1 25%; min-width: 0; padding: 4px 6px; box-sizing: border-box; border-right: 1px dashed #94a3b8; }
                  .print-col:last-child { border-right: none; }
                  .slip-section { text-align: center; page-break-inside: avoid; break-inside: avoid; }
                  .separator { border-bottom: 1px dashed #94a3b8; margin: 1.5rem 0; }
                  .line-customer { font-size: 18px; font-weight: 700; color: #1E293B; margin-bottom: 2px; word-break: break-word; }
                  .line-product { font-size: 14px; font-weight: 600; color: #4338CA; margin-bottom: 2px; word-break: break-word; }
                  .line-details { font-size: 12px; color: #64748B; margin-bottom: 2px; word-break: break-word; }
                  .line-price-qty { font-size: 12px; color: #334155; word-break: break-word; font-weight: 500;}
                  .product-title { font-size: 25px; font-weight: 700; color: #4338CA; margin: 0 0 6px 0; word-break: break-word; }
                  .variation-section { margin-bottom: 8px; page-break-inside: avoid; break-inside: avoid; }
                  .variation-title { font-size: 1.25rem; font-weight: 600; color: #334155; margin: 0 0 6px 0; word-break: break-word; }
                  .variation-subtotal { font-size: 1rem; color: #64748B; }
                  ul { list-style-type: none; padding-left: 1rem; margin: 0; }
                  li { font-size: 20px; color: #475569; padding: 0; margin-bottom: 6px; word-break: break-word; }
                  @media print { body { margin: 2px; } }
              </style>
          </head>
          <body><div class="print-wrapper">${htmlContent}</div></body>
      </html>`;
    openPrintWindow(fullHtml, title);
}


function generatePrintSlipsForProductSummary(keysToPrint) {
    const productSummary = calculateProductSummary();
    const generateSingleSlipHtml = (key) => {
        const [productName, variationName, customerName, custIndexStr] = key.split('|');
        const custIndex = parseInt(custIndexStr, 10);
        const variationInfo = productSummary[productName]?.variations[variationName];
        if (!variationInfo) return '';
        const originalProduct = state.orders.flatMap(o => o.products).find(p => p.name === productName && (p.details || 'N/A') === variationName);
        const unitPrice = originalProduct ? originalProduct.unitPrice : 0;
        const customerEntry = variationInfo.customers[custIndex];
        if (!customerEntry || customerEntry.customerName !== customerName) return '';
        const detailsText = variationName === 'N/A' ? '' : `(${variationName})`;
        return `<div class="slip-section"><div class="line-customer">${customerName}</div><div class="line-product">${productName}</div><div class="line-details">${detailsText}</div><div class="line-price-qty">$${unitPrice.toFixed(2)} Qty: ${customerEntry.quantity}</div></div>`;
    };

    const sortedKeys = keysToPrint.sort((a, b) => a.localeCompare(b, 'th'));
    if (sortedKeys.length <= 1) {
        const singleSlip = sortedKeys.map(key => generateSingleSlipHtml(key)).join('');
        return singleSlip ? `${singleSlip}<div class="separator"></div>` : '';
    }

    let rowsHtml = '';
    const itemsPerRow = 4;
    for (let i = 0; i < sortedKeys.length; i += itemsPerRow) {
        const rowItems = sortedKeys.slice(i, i + itemsPerRow);
        const colsHtml = rowItems.map(key => `<div class="print-col">${generateSingleSlipHtml(key)}</div>`).join('');
        const emptyColsHtml = Array(itemsPerRow - rowItems.length).fill('<div class="print-col"></div>').join('');
        rowsHtml += `<div class="print-row">${colsHtml}${emptyColsHtml}</div>`;
    }
    return `<div class="print-container">${rowsHtml}</div>`;
}


function handlePrintProductSummary(productName) {
    const productSummary = calculateProductSummary();
    const productData = productSummary[productName];
    const selectedKeysForProduct = Array.from(state.selectedProductSummaryItems).filter(key => key.startsWith(`${productName}|`));
    
    if (selectedKeysForProduct.length > 0) {
        const slipsHtml = generatePrintSlipsForProductSummary(selectedKeysForProduct);
        generateProductSummaryPrintPage(slipsHtml, `Product Details - ${productName}`);
    } else {
        const summaryContent = `
            <h1 class="product-title">${productName}</h1>
            ${Object.keys(productData.variations).sort((a, b) => a.localeCompare(b, 'th')).map(variationName => {
                const originalProduct = state.orders.flatMap(o => o.products).find(p => p.name === productName && (p.details || 'N/A') === variationName);
                const unitPrice = originalProduct ? originalProduct.unitPrice : 0;
                return `
                <div class="variation-section">
                    <h2 class="variation-title">${variationName === 'N/A' ? 'No Details' : variationName} 
                        <span class="variation-subtotal">($${unitPrice.toFixed(2)})</span>
                    </h2>
                    <ul>
                        ${productData.variations[variationName].customers.map(customer => `<li>${customer.customerName} - <strong>Qty: ${customer.quantity}</strong></li>`).join('')}
                    </ul>
                </div>`;
            }).join('')}`;
        generateProductSummaryPrintPage(summaryContent, `Product Summary - ${productName}`);
    }
}

function handlePrintAllSelectedSlips() {
    const selectedKeys = Array.from(state.selectedProductSummaryItems);
    if (selectedKeys.length === 0) {
        alert("Please select at least one item to print.");
        return;
    }
    const slipsHtml = generatePrintSlipsForProductSummary(selectedKeys);
    generateProductSummaryPrintPage(slipsHtml, 'Selected Items');
}

function handleDownloadSelectedCsv() {
    if (state.selectedProductSummaryItems.size === 0) return;
    const productSummary = calculateProductSummary();
    const header = 'product_name,details,customer_name,quantity,unit_price';
    const rows = Array.from(state.selectedProductSummaryItems).map(key => {
        const [productName, variationName, customerName, custIndexStr] = key.split('|');
        const custIndex = parseInt(custIndexStr, 10);
        const customerEntry = productSummary[productName]?.variations[variationName]?.customers[custIndex];
        if (!customerEntry) return null;
        const originalProduct = state.orders.flatMap(o => o.products).find(p => p.name === productName && (p.details || 'N/A') === variationName);
        const unitPrice = originalProduct ? originalProduct.unitPrice.toFixed(2) : '0.00';
        return [productName, variationName === 'N/A' ? '*' : variationName, customerName, customerEntry.quantity, unitPrice].join(',');
    }).filter(Boolean);
    
    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'selected_products_summary.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function init() {
    const savedCsv = localStorage.getItem(LOCAL_STORAGE_KEY);
    const dataToLoad = savedCsv !== null ? savedCsv : INITIAL_CSV_DATA;
    
    setState({
        rawCsv: dataToLoad,
        orders: parseCsv(dataToLoad)
    }, { render: true, save: false });

    setupEventListeners();

    document.getElementById('view-container').addEventListener('focusout', (e) => {
        if (e.target.id === 'csv-textarea') {
            // The 'input' event handler has already updated the state's rawCsv and orders.
            // This 'focusout' event is just to finalize the changes by saving,
            // adding to history, and re-rendering the whole app to reflect changes.
            // We pass an empty state object because the state is already current from the input handler,
            // preventing a race condition where this would overwrite changes from the modal.
            setState({}, { save: true, render: true, history: true });
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
