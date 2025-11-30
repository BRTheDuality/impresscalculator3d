// ============================================================
//  UTILIDADES
// ============================================================

// Converte string com vírgula ou ponto em número
function parseNumber(value) {
    if (value === null || value === undefined) return 0;
    if (typeof value === "number") return value;
    const cleaned = value.toString().replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
}

// Formata em R$ (pt-BR)
function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
    }).format(value || 0);
}

// Pega valor do radio selecionado
function getSelectedRadio(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
}

// Salva valor simples no localStorage
function savePref(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // se não der, ignora
    }
}

// Lê valor simples do localStorage
function loadPref(key, fallback = "") {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        return JSON.parse(raw);
    } catch (e) {
        return fallback;
    }
}

// ============================================================
//  PRESETS DE IMPRESSORAS (valores aproximados)
// ============================================================

const PRINTER_PRESETS = {
    ender3: {
        name: "Creality Ender 3",
        powerW: 220,        // potência média em watts
        hourlyMachine: 1.5  // custo hora (depreciação/manutenção) em R$
    },
    ender3v2: {
        name: "Creality Ender 3 V2",
        powerW: 240,
        hourlyMachine: 1.8
    },
    ender3v3se: {
        name: "Creality Ender 3 V3 SE",
        powerW: 260,
        hourlyMachine: 2.0
    },
    prusa_i3: {
        name: "Prusa i3",
        powerW: 200,
        hourlyMachine: 2.5
    }
};

// Custos fixos por acabamento extra (exemplo)
const FINISHING_COSTS = {
    lixamento: 3.0,
    primer: 4.0,
    verniz: 4.5
};

// Sugestões de embalagem (caso o usuário não informe)
const PACKAGING_SUGGESTION = {
    none: 0,
    simple: 2.5,
    custom: 5.0
};

// ============================================================
//  INICIALIZAÇÃO
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    const printerModelEl = document.getElementById("printerModel");
    const customPrinterFieldsEl = document.getElementById("custom-printer-fields");
    const printerPowerEl = document.getElementById("printerPower");
    const printerHourlyCostEl = document.getElementById("printerHourlyCost");

    const printHoursEl = document.getElementById("printHours");
    const printMinutesEl = document.getElementById("printMinutes");

    const filamentWeightEl = document.getElementById("filamentWeight");
    const filamentPriceEl = document.getElementById("filamentPrice");
    const filamentSpoolWeightEl = document.getElementById("filamentSpoolWeight");

    const kwhPriceEl = document.getElementById("kwhPrice");

    const pieceTypeEl = document.getElementById("pieceType");
    const paintingSectionEl = document.getElementById("painting-section");
    const paintingModeEl = document.getElementById("paintingMode");
    const paintingHoursEl = document.getElementById("paintingHours");
    const paintingRateEl = document.getElementById("paintingRate");
    const finishingExtrasEl = document.getElementById("finishingExtras");

    const packagingTypeEl = document.getElementById("packagingType");
    const packagingCostEl = document.getElementById("packagingCost");

    const shippingTypeEl = document.getElementById("shippingType");
    const shippingCostEl = document.getElementById("shippingCost");

    const profitModeEl = document.getElementById("profitMode");
    const profitPercentEl = document.getElementById("profitPercent");
    const profitFixedEl = document.getElementById("profitFixed");

    const calculateBtn = document.getElementById("calculateBtn");

    const resultFilamentEl = document.getElementById("resultFilament");
    const resultEnergyEl = document.getElementById("resultEnergy");
    const resultMachineEl = document.getElementById("resultMachine");
    const resultPaintingEl = document.getElementById("resultPainting");
    const resultPackagingEl = document.getElementById("resultPackaging");
    const resultShippingEl = document.getElementById("resultShipping");
    const resultTotalCostEl = document.getElementById("resultTotalCost");
    const resultProfitEl = document.getElementById("resultProfit");
    const resultFinalPriceEl = document.getElementById("resultFinalPrice");

    // --------- Preferências: carrega algumas do localStorage ----------
    kwhPriceEl.value = loadPref("pref_kwhPrice", "");
    filamentPriceEl.value = loadPref("pref_filamentPrice", "");
    filamentSpoolWeightEl.value = loadPref("pref_filamentSpoolWeight", filamentSpoolWeightEl.value || "1000");
    profitPercentEl.value = loadPref("pref_profitPercent", "");

    // Salvar quando mudar
    kwhPriceEl.addEventListener("change", () => savePref("pref_kwhPrice", kwhPriceEl.value));
    filamentPriceEl.addEventListener("change", () => savePref("pref_filamentPrice", filamentPriceEl.value));
    filamentSpoolWeightEl.addEventListener("change", () => savePref("pref_filamentSpoolWeight", filamentSpoolWeightEl.value));
    profitPercentEl.addEventListener("change", () => savePref("pref_profitPercent", profitPercentEl.value));

    // --------- Impressora custom x preset ----------
    function updatePrinterCustomVisibility() {
        if (printerModelEl.value === "custom") {
            customPrinterFieldsEl.style.display = "block";
        } else {
            customPrinterFieldsEl.style.display = "none";
        }
    }

    printerModelEl.addEventListener("change", updatePrinterCustomVisibility);
    updatePrinterCustomVisibility();

    // --------- Modo Hobby x Profissional ----------
    function updateModeUI() {
        const mode = getSelectedRadio("mode");

        if (mode === "hobby") {
            // Sem lucro
            profitModeEl.value = "none";
            profitModeEl.disabled = true;
            profitPercentEl.disabled = true;
            profitFixedEl.disabled = true;
        } else {
            // Profissional
            profitModeEl.disabled = false;
            // Se ainda estiver "none", coloca porcentagem padrão
            if (profitModeEl.value === "none") {
                profitModeEl.value = "percent";
            }
            profitPercentEl.disabled = profitModeEl.value !== "percent";
            profitFixedEl.disabled = profitModeEl.value !== "fixed";

            if (profitModeEl.value === "percent" && !profitPercentEl.value) {
                profitPercentEl.value = 200; // margem padrão
                savePref("pref_profitPercent", profitPercentEl.value);
            }
        }
    }

    document.querySelectorAll('input[name="mode"]').forEach(radio => {
        radio.addEventListener("change", updateModeUI);
    });

    // Quando mudar o tipo de margem especificamente
    profitModeEl.addEventListener("change", () => {
        const mode = getSelectedRadio("mode");
        if (mode === "hobby") {
            updateModeUI();
            return;
        }
        if (profitModeEl.value === "percent") {
            profitPercentEl.disabled = false;
            profitFixedEl.disabled = true;
        } else if (profitModeEl.value === "fixed") {
            profitPercentEl.disabled = true;
            profitFixedEl.disabled = false;
        } else {
            profitPercentEl.disabled = true;
            profitFixedEl.disabled = true;
        }
    });

    updateModeUI();

    // --------- Peça neutra x colorida ----------
    function updatePieceTypeUI() {
        const type = pieceTypeEl.value;
        if (type === "neutra") {
            // Deixa pintura opcional, mas "desligada" por padrão
            paintingSectionEl.style.opacity = "0.7";
            paintingSectionEl.style.pointerEvents = "auto";
            paintingModeEl.value = "none";
        } else {
            // Colorida: dá um destaque visual e sugere pintura simples
            paintingSectionEl.style.opacity = "1";
            if (paintingModeEl.value === "none") {
                paintingModeEl.value = "simple";
            }
        }
    }

    pieceTypeEl.addEventListener("change", updatePieceTypeUI);
    updatePieceTypeUI();

    // --------- Cálculo principal ----------
    calculateBtn.addEventListener("click", () => {
        // Tempo total de impressão (em horas)
        const hours = parseNumber(printHoursEl.value);
        const minutes = parseNumber(printMinutesEl.value);
        const totalHours = hours + minutes / 60;

        // Filamento
        const filamentWeight = parseNumber(filamentWeightEl.value);       // g
        const filamentPrice = parseNumber(filamentPriceEl.value);         // R$ rolo
        const spoolWeight = parseNumber(filamentSpoolWeightEl.value) || 1000; // g

        let filamentCost = 0;
        if (filamentWeight > 0 && filamentPrice > 0 && spoolWeight > 0) {
            filamentCost = (filamentWeight / spoolWeight) * filamentPrice;
        }

        // Impressora / energia
        const printerModel = printerModelEl.value;
        let powerW = 0;
        let hourlyMachine = 0;

        if (printerModel === "custom") {
            powerW = parseNumber(printerPowerEl.value);
            hourlyMachine = parseNumber(printerHourlyCostEl.value);
        } else {
            const preset = PRINTER_PRESETS[printerModel];
            if (preset) {
                powerW = preset.powerW;
                hourlyMachine = preset.hourlyMachine;
            }
        }

        const kwhPrice = parseNumber(kwhPriceEl.value);
        let energyCost = 0;

        if (powerW > 0 && kwhPrice > 0 && totalHours > 0) {
            const kW = powerW / 1000;
            energyCost = kW * totalHours * kwhPrice;
        }

        // Depreciação / máquina
        let machineCost = 0;
        if (hourlyMachine > 0 && totalHours > 0) {
            machineCost = hourlyMachine * totalHours;
        }

        // Pintura & acabamento
        let paintingCost = 0;
        const paintingMode = paintingModeEl.value;
        const pieceType = pieceTypeEl.value;

        if (paintingMode !== "none" || pieceType === "colorida") {
            const paintingHours = parseNumber(paintingHoursEl.value);
            const paintingRate = parseNumber(paintingRateEl.value);
            if (paintingHours > 0 && paintingRate > 0) {
                paintingCost += paintingHours * paintingRate;
            }

            // Extras
            const selectedExtras = Array.from(finishingExtrasEl.selectedOptions).map(
                opt => opt.value
            );
            selectedExtras.forEach(extra => {
                const extraCost = FINISHING_COSTS[extra] || 0;
                paintingCost += extraCost;
            });

            // Se a peça é colorida mas não preencheu nada, não força custo, só deixa 0
        }

        // Embalagem
        const packagingType = packagingTypeEl.value;
        let packagingCost = parseNumber(packagingCostEl.value);

        if (packagingCost === 0) {
            // Se o usuário não informar nada, usa sugestão
            const suggestion = PACKAGING_SUGGESTION[packagingType] || 0;
            packagingCost = suggestion;
        }

        // Frete
        const shippingCost = parseNumber(shippingCostEl.value); // aqui pode ser 0

        // Custo total (sem lucro)
        const totalCost =
            filamentCost +
            energyCost +
            machineCost +
            paintingCost +
            packagingCost +
            shippingCost;

        // Lucro
        const profitMode = profitModeEl.value;
        let profitValue = 0;

        if (profitMode === "percent") {
            const perc = parseNumber(profitPercentEl.value);
            if (perc > 0) {
                profitValue = totalCost * (perc / 100);
            }
        } else if (profitMode === "fixed") {
            profitValue = parseNumber(profitFixedEl.value);
        }

        // Preço final sugerido
        const finalPrice = totalCost + profitValue;

        // Atualiza tela
        resultFilamentEl.textContent = formatCurrency(filamentCost);
        resultEnergyEl.textContent = formatCurrency(energyCost);
        resultMachineEl.textContent = formatCurrency(machineCost);
        resultPaintingEl.textContent = formatCurrency(paintingCost);
        resultPackagingEl.textContent = formatCurrency(packagingCost);
        resultShippingEl.textContent = formatCurrency(shippingCost);
        resultTotalCostEl.textContent = formatCurrency(totalCost);
        resultProfitEl.textContent = formatCurrency(profitValue);
        resultFinalPriceEl.textContent = formatCurrency(finalPrice);
    });
});
