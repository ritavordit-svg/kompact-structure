const { APIURL } = require("../../../Config/config")

const invoiceMailTemplate = function (inv){

    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>${inv.companyNameFrom}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">
        <style>
            .PDF_design_wrapper *{
                font-family: 'Noto Sans', sans-serif;
                margin: 0;
                padding: 0;
            }
            .PDF_design_wrapper table{
                border-collapse: collapse;
                margin-top: 25px;
            }
            .PDF_design_wrapper th{
                border-top:1px solid #b4b4b4;
            }
            .PDF_design_wrapper th, .PDF_design_wrapper td{
                border-bottom:1px solid #b4b4b4;
                text-align: center;
            }
            .PDF_design_wrapper th:first-child, .PDF_design_wrapper td:first-child{
                text-align: left;
            }
        </style>
    </head>
    <body>
        <div class="container" style="max-width:970px;width:100%;margin:0 auto;">
            <div class="PDF_design_wrapper" style="padding:35px;">
                <div class="invoce--text" style="max-width:260px;width: 100%;float: right;margin-bottom: 30px;">
                    <h4 style="">INVOICE</h4>
                </div>
                <div class="" style="clear:both;"></div>
                <div class="header_top-section" style="display:flex;justify-content:space-between;align-items:start">
                    <div class="logo" style="max-width:640px;width: 100%;margin-top: 10px;">
                    <img src="${APIURL}api/v1/getlogo?key=logo&type=admin" alt="logo" />
                    </div>
                    <div class="header_top-left--text" style="max-width:260px;width: 100%;">
                        <p style="margin:0px 0px;font-size: 14px;">Invoice # <b>${inv.invoiceId}</b></p>
                        <p style="margin:5px 0px;font-size: 14px;">Invoice Date <b>${inv.invoiceDate}</b></p>
                        <p style="margin:5px 0px;font-size: 14px;">Invoice Amount <b>${inv.invoiceAmount} (USD)</b></p>
                    </div>
                </div>
                <div class="header_top-section" style="display:flex;justify-content:space-between;align-items:start">
                    <div class="logo" style="max-width:640px;width: 100%;margin-top: 10px;">
                       <p style="font-size:14px;">
                            <span style="display:block;">${inv.companyNameFrom}</span>
                            <span style="display:block;">${inv.addressFrom}</span>
                            <span style="display:block;">${inv.cityFrom}, ${inv.stateFrom} ${inv.pincodeFrom}</span>
                            <span style="display:block;">${inv.countryFrom}</span>
                       </p>
                    </div>
                    <div class="header_top-left--text" style="max-width:260px;width: 100%;">
                        <p style="margin:5px 0px;color:green;font-size: 14px;text-transform:capitalize;">${inv.invoiceStatus}</p>
                        <span class="" style="display:inline-block;width:90px;height: 2px;background-color: #ededed;"></span>
                    </div>
                </div>
                <div class="saperater" style="width:100px;height:2px;background-color:#ededed;margin:10px 0px 0px;"></div>
                <div class="header_top-section" style="display:flex;justify-content:space-between;align-items:start">
                    <div class="logo" style="max-width:640px;width: 100%;margin-top: 10px;">
                       <p style="font-size:14px;">
                            <b style="display:block;font-size:13px;">BILLED TO</b>
                            <span style="display:block;">${inv.companyName}</span>
                            <span style="display:block;">${inv.companyAddress1}</span>
                            <span style="display:block;">${inv.companyAddress2}</span>
                       </p>
                    </div>
                    <div class="header_top-left--text" style="max-width:260px;width: 100%;">
                        <b style="margin:0px 0px;font-size: 13px;">SUBSCRIPTION</b>
                        <p style="margin:5px 0px;font-size: 14px;">ID <b>${inv.subscriptionId}</b></p>
                        <p style="margin:5px 0px;font-size: 14px;">Billing Period <b>${inv.billingPeriod}</b></p>
                        <p style="margin:5px 0px;font-size: 14px;">Next Billing Date <b>${inv.newxtBillingDate}</b></p>
                    </div>
                </div>
    
                <!-- --------- -->
                <table style="width: 100%;text-align:left;">
                    <thead>
                        <tr>
                            <th style="font-size: 14px;width:60%;padding: 10px 0px;">DESCRIPTION</th>
                            <th style="font-size: 14px;width:13.33%;padding: 10px 0px;">Unit</th>
                            <th style="font-size: 14px;width:13.33%;padding: 10px 0px;">Unit Price</th>
                            <th style="font-size: 14px;width:13.33%;padding: 10px 0px;">AMOUNT (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                       ${inv.lineItemData}
                    </tbody>
                </table>
                <!-- Total -->
                <div class="totalamountArea">
                    <div class="" style="text-align: right;float: right;">
                        <p style="font-size:14px;display:flex;justify-content:end;padding:15px 0px;">
                            <b>Total</b>
                            <b style="padding-left:35px;">$${inv.invoiceAmount}</b>
                        </p>
                        <p style="font-size:14px;display:flex;justify-content:end;padding:15px 0px;">
                            <b>Payments</b>
                            <span style="padding-left:33px;">($${inv.paymentAmount})</span>
                        </p>
                        ${inv.credits}
                        <div style="width:90px;height:2px;background-color: #ededed;    margin-left: auto;"></div>
                        <p style="font-size:16px;display:flex;justify-content: end;padding:15px 0px;">
                            <span>Amount Due (USD) </span>
                            <span style="padding-left:35px;">$${inv.amountDue}</span>
                        </p>
                        <div style="width:90px;height:2px;background-color: #ededed;    margin-left: auto;"></div>
                    </div>
                    <div style="clear:both;"></div>
                </div>
                <div>
                    ${inv.paymentsTitle}
                    ${inv.paymentNotes}
                    ${inv.paymentCreditNotes}
                </div>
            </div>
        </div>
    </body>
    </html>`
}
module.exports = invoiceMailTemplate
