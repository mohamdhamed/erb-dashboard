export const generateInvoiceXML = (service, clientData, supplierData) => {
    // Helper to format date as YYYY-MM-DD
    const formatDate = (dateString) => {
        if (!dateString) return new Date().toISOString().split('T')[0];
        return dateString;
    };

    // Helper to clean strings (remove invalid chars)
    const clean = (str) => (str || '').replace(/[&<>"']/g, '');

    // Default Supplier Data (PULSAR S.A.S) - Should be dynamic ideally
    const supplier = supplierData || {
        IdPaese: 'IT',
        IdCodice: '08544460962', // Example P.IVA for Pulsar
        Denominazione: 'PULSAR S.A.S DI MOHAMED HAMED',
        RegimeFiscale: 'RF01', // Ordinario
        Indirizzo: 'VIA PADOVA 226',
        Comune: 'MILANO',
        Provincia: 'MI',
        CAP: '20132',
        Nazione: 'IT'
    };

    // Client Data Validation
    const client = {
        IdPaese: 'IT', // Default to IT
        IdCodice: clientData?.taxId || '00000000000', // P.IVA or CF
        Denominazione: clean(clientData?.name || service.client),
        Indirizzo: 'VIA ROMA 1', // Placeholder if missing
        Comune: 'MILANO',
        Provincia: 'MI',
        CAP: '20100',
        Nazione: 'IT'
    };

    // Invoice Number & Date
    const invoiceNumber = service.invoice || `P-${service.id}`;
    const invoiceDate = formatDate(service.date);
    const amount = Number(service.revenue).toFixed(2);
    const vatRate = '22.00'; // Standard IVA
    const taxAmount = (amount * 0.22).toFixed(2);
    const totalAmount = (Number(amount) + Number(taxAmount)).toFixed(2);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<p:FatturaElettronica versione="FPR12" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:p="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2 http://www.fatturapa.gov.it/export/fatturazione/sdi/fatturapa/v1.2/Schema_del_file_xml_FatturaPA_v1.2.xsd">
    <FatturaElettronicaHeader>
        <DatiTrasmissione>
            <IdTrasmittente>
                <IdPaese>${supplier.IdPaese}</IdPaese>
                <IdCodice>${supplier.IdCodice}</IdCodice>
            </IdTrasmittente>
            <ProgressivoInvio>${Date.now().toString().slice(-10)}</ProgressivoInvio>
            <FormatoTrasmissione>FPR12</FormatoTrasmissione>
            <CodiceDestinatario>0000000</CodiceDestinatario>
        </DatiTrasmissione>
        <CedentePrestatore>
            <DatiAnagrafici>
                <IdFiscaleIVA>
                    <IdPaese>${supplier.IdPaese}</IdPaese>
                    <IdCodice>${supplier.IdCodice}</IdCodice>
                </IdFiscaleIVA>
                <Anagrafica>
                    <Denominazione>${supplier.Denominazione}</Denominazione>
                </Anagrafica>
                <RegimeFiscale>${supplier.RegimeFiscale}</RegimeFiscale>
            </DatiAnagrafici>
            <Sede>
                <Indirizzo>${supplier.Indirizzo}</Indirizzo>
                <CAP>${supplier.CAP}</CAP>
                <Comune>${supplier.Comune}</Comune>
                <Provincia>${supplier.Provincia}</Provincia>
                <Nazione>${supplier.Nazione}</Nazione>
            </Sede>
        </CedentePrestatore>
        <CessionarioCommittente>
            <DatiAnagrafici>
                <IdFiscaleIVA>
                    <IdPaese>${client.IdPaese}</IdPaese>
                    <IdCodice>${client.IdCodice}</IdCodice>
                </IdFiscaleIVA>
                <Anagrafica>
                    <Denominazione>${client.Denominazione}</Denominazione>
                </Anagrafica>
            </DatiAnagrafici>
            <Sede>
                <Indirizzo>${client.Indirizzo}</Indirizzo>
                <CAP>${client.CAP}</CAP>
                <Comune>${client.Comune}</Comune>
                <Provincia>${client.Provincia}</Provincia>
                <Nazione>${client.Nazione}</Nazione>
            </Sede>
        </CessionarioCommittente>
    </FatturaElettronicaHeader>
    <FatturaElettronicaBody>
        <DatiGenerali>
            <DatiGeneraliDocumento>
                <TipoDocumento>TD01</TipoDocumento>
                <Divisa>EUR</Divisa>
                <Data>${invoiceDate}</Data>
                <Numero>${invoiceNumber}</Numero>
                <ImportoTotaleDocumento>${totalAmount}</ImportoTotaleDocumento>
            </DatiGeneraliDocumento>
        </DatiGenerali>
        <DatiBeniServizi>
            <DettaglioLinee>
                <NumeroLinea>1</NumeroLinea>
                <Descrizione>${clean(service.type)} - ${clean(service.location)}</Descrizione>
                <Quantita>1.00</Quantita>
                <UnitaMisura>N.</UnitaMisura>
                <PrezzoUnitario>${amount}</PrezzoUnitario>
                <PrezzoTotale>${amount}</PrezzoTotale>
                <AliquotaIVA>${vatRate}</AliquotaIVA>
            </DettaglioLinee>
            <DatiRiepilogo>
                <AliquotaIVA>${vatRate}</AliquotaIVA>
                <ImponibileImporto>${amount}</ImponibileImporto>
                <Imposta>${taxAmount}</Imposta>
                <EsigibilitaIVA>I</EsigibilitaIVA>
            </DatiRiepilogo>
        </DatiBeniServizi>
    </FatturaElettronicaBody>
</p:FatturaElettronica>`;

    return xml;
};
