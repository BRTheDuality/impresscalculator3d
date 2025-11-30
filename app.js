// ============================================================
//  FUNÇÕES DE APOIO
// ============================================================

// Converte string com vírgula ou ponto em número
function parseNumber(value) {
    if (value === null || value === undefined) return 0;
    if (typeof value === "number") return value;
    const cleaned = value.toString().replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
}

// Formata moeda em R$
function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
    }).format(value || 0);
}

// Pega valor do radio selecionado
function getSelectedRadio(name) {
    const checked = document.querySelector('input[name="' + name + '"]:checked');
    return checked ? checked.value : null;
}

// Preferências simples no localStorage
function savePref(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // ignora erros de quota
    }
}

function loadPref(key, fallback) {
    if (fallback === undefined) fallback = "";
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        return JSON.parse(raw);
    } catch (e) {
        return fallback;
    }
}

// ============================================================
//  PRESETS / CONSTANTES
// ============================================================

const PRINTER_PRESETS = {
    ender3: {
        name: "Creality Ender 3",
        powerW: 220,
        hourlyMachine: 1.5
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

const FINISHING_COSTS = {
    lixamento: 3.0,
    primer: 4.0,
    verniz: 4.5
};

const PACKAGING_SUGGESTION = {
    none: 0,
    simple: 2.5,
    custom: 5.0
};

// ============================================================
//  INICIALIZAÇÃO
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
    console.log("Calculadora 3D carregada."); // debug simples

    // ---- pega elementos da tela ----
    var printerModelEl = document.getElementById("printerModel");
    var customPrinterFieldsEl = document.getElementById("custom-printer-fields");
    var printerPowerEl = document.getElementById("printerPower");
    var printerHourlyCostEl = document.getElementById("printerHourlyCost");

    var printHoursEl = document.getElementById("printHours");
    var printMinutesEl = document.getElementById("printMinutes");

    var filamentWeightEl = document.getElementById("filamentWeight");
    var filamentPriceEl = document.getElementById("filamentPrice");
    var filamentSpoolWeightEl = document.getElementById("filamentSpoolWeight");

    var kwhPriceEl = document.getElementById("kwhPrice");

    var pieceTypeEl = document.getElementById("pieceType");
    var paintingSectionEl = document.getElementById("painting-section");
    var paintingModeEl = document.getElementById("paintingMode");
    var paintingHoursEl = document.getElementById("paintingHours");
    var paintingRateEl = document.getElementById("paintingRate");
    var finishingExtrasEl = document.getElementById("finishingExtras");

    var packagingTypeEl = document.getElementById("packagingType");
    var packagingCostEl = document.getElementById("packagingCost");

    var shippingTypeEl = document.getElementById("shippingType");
    var shippingCostEl = document.getElementById("shippingCost");

    var profitModeEl = document.getElementById("profitMode");
    var profitPercentEl = document.getElementById("profitPercent");
    var profitFixedEl = document.getElementById("profitFixed");

    var calculateBtn = document.getElementById("calculateBtn");

    var resultFilamentEl = document.getElementById("resultFilament");
    var resultEnergyEl = document.getElementById("resultEnergy");
    var resultMachineEl = document.getElementById("resultMachine");
    var resultPaintingEl = document.getElementById("resultPainting");
    var resultPackagingEl = document.getElementById("resultPackaging");
    var resultShippingEl = document.getElementById("resultShipping");
    var resultTotalCostEl = document.getElementById("resultTotalCost");
    var resultProfitEl = document.getElementById("resultProfit");
    var resultFinalPriceEl = document.getElementById("resultFinalPrice");

    // ---- carrega prefs ----
    kwhPriceEl.value = loadPref("pref_kwhPrice", "");
    filamentPriceEl.value = loadPref("pref_filamentPrice", "");
    filamentSpoolWeightEl.value = loadPref("pref_filamentSpoolWeight", filamentSpoolWeightEl.value || "1000");
    profitPercentEl.value = loadPref("pref_profitPercent", "");

    kwhPriceEl.addEventListener("change", function () {
        savePref("pref_kwhPrice", kwhPriceEl.value);
    });
    filamentPriceEl.addEventListener("change", function () {
        savePref("pref_filamentPrice", filamentPriceEl.value);
    });
    filamentSpoolWeightEl.addEventListener("change", function () {
        savePref("pref_filamentSpoolWeight", filamentSpoolWeightEl.value);
    });
    profitPercentEl.addEventListener("change", function () {
        savePref("pref_profitPercent", profitPercentEl.value);
    });

    // ---- impressora custom x preset ----
    function updatePrinterCustomVisibility() {
        if (printerModelEl.value === "custom") {
            customPrinterFieldsEl.style.display = "block";
        } else {
       	    customPrinterFieldsEl.style.display = "none";
        }
    }
    printerModelEl.addEventListener("change", updatePrinterCustomVisibility);
    updatePrinterCustomVisibility();

    // ---- modo hobby x pro ----
    function updateModeUI() {
        var mode = getSelectedRadio("mode");

        if (mode === "hobby") {
            profitModeEl.value = "none";
            profitModeEl.disabled = true;
            profitPercentEl.disabled = true;
            profitFixedEl.disabled = true;
        } else {
            profitModeEl.disabled = false;
            if (profitModeEl.value === "none") {
                profitModeEl.value = "percent";
            }
            profitPercentEl.disabled = profitModeEl.value !== "percent";
            profitFixedEl.disabled = profitModeEl.value !== "fixed";

            if (profitModeEl.value === "percent" && !profitPercentEl.value) {
                profitPercentEl.value = 200;
                savePref("pref_profitPercent", profitPercentEl.value);
            }
        }
    }

    var modeRadios = document.querySelectorAll('input[name="mode"]');
    modeRadios.forEach(function (r) {
        r.addEventListener("change", updateModeUI);
    });

    profitModeEl.addEventListener("change", function () {
        var mode = getSelectedRadio("mode");
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

    // ---- tipo de peça ----
    function updatePieceTypeUI() {
        var type = pieceTypeEl.value;
        if (type === "neutra") {
            paintingSectionEl.style.opacity = "0.7";
            paintingModeEl.value = "none";
        } else {
            paintingSectionEl.style.opacity = "1";
            if (paintingModeEl.value === "none") {
                paintingModeEl.value = "simple";
            }
        }
    }
    pieceTypeEl.addEventListener("change", updatePieceTypeUI);
    updatePieceTypeUI();

    // ========================================================
    //  CÁLCULO PRINCIPAL
    // ========================================================

    calculateBtn.addEventListener("click", function () {
        console.log("Clique em Calcular"); // debug

        // tempo de impressão
        var hours = parseNumber(printHoursEl.value);
        var minutes = parseNumber(printMinutesEl.value);
        var totalHours = hours + minutes / 60;

        // filamento
        var filamentWeight = parseNumber(filamentWeightEl.value);
        var filamentPrice = parseNumber(filamentPriceEl.value);
        var spoolWeight = parseNumber(filamentSpoolWeightEl.value) || 1000;

        var filamentCost = 0;
        if (filamentWeight > 0 && filamentPrice > 0 && spoolWeight > 0) {
            filamentCost = (filamentWeight / spoolWeight) * filamentPrice;
        }

        // impressora / energia
        var printerModel = printerModelEl.value;
        var powerW = 0;
        var hourlyMachine = 0;

        if (printerModel === "custom") {
            powerW = parseNumber(printerPowerEl.value);
            hourlyMachine = parseNumber(printerHourlyCostEl.value);
        } else if (PRINTER_PRESETS[printerModel]) {
            powerW = PRINTER_PRESETS[printerModel].powerW;
            hourlyMachine = PRINTER_PRESETS[printerModel].hourlyMachine;
        }

        var kwhPrice = parseNumber(kwhPriceEl.value);
        var energyCost = 0;
        if (powerW > 0 && kwhPrice > 0 && totalHours > 0) {
            var kW = powerW / 1000;
            energyCost = kW * totalHours * kwhPrice;
        }

        var machineCost = 0;
        if (hourlyMachine > 0 && totalHours > 0) {
            machineCost = hourlyMachine * totalHours;
        }

        // pintura / acabamento
        var paintingCost = 0;
        var paintingMode = paintingModeEl.value;
        var pieceType = pieceTypeEl.value;

        if (paintingMode !== "none" || pieceType === "colorida") {
            var paintingHours = parseNumber(paintingHoursEl.value);
            var paintingRate = parseNumber(paintingRateEl.value);
            if (paintingHours > 0 && paintingRate > 0) {
                paintingCost += paintingHours * paintingRate;
            }

            var selectedExtras = Array.prototype.slice.call(
                finishingExtrasEl.selectedOptions
            ).map(function (opt) {
                return opt.value;
            });

            selectedExtras.forEach(function (extra) {
                var extraCost = FINISHING_COSTS[extra] || 0;
                paintingCost += extraCost;
            });
        }

        // embalagem
        var packagingType = packagingTypeEl.value;
        var packagingCost = parseNumber(packagingCostEl.value);
        if (!packagingCost) {
            packagingCost = PACKAGING_SUGGESTION[packagingType] || 0;
        }

        // frete
        var shippingCost = parseNumber(shippingCostEl.value);

        // custo total
        var totalCost =
            filamentCost +
            energyCost +
            machineCost +
            paintingCost +
            packagingCost +
            shippingCost;

        // lucro
        var profitMode = profitModeEl.value;
        var profitValue = 0;

        if (profitMode === "percent") {
            var perc = parseNumber(profitPercentEl.value);
            if (perc > 0) {
                profitValue = totalCost * (perc / 100);
            }
        } else if (profitMode === "fixed") {
            profitValue = parseNumber(profitFixedEl.value);
        }

        var finalPrice = totalCost + profitValue;

        // joga na tela
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
