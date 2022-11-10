import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Papa from "papaparse";
import { CSVLink } from 'react-csv';
import Tablerender from '../Table/TableRenderer';
import { constant, currency } from '../common';

const useStyles = makeStyles({
    mainContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        fontSize: "40px",
        backgroundColor: "#459bcb",
        color: "white",
    },
    ButtonContainer: {
        width: "100%",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
    },
    convertButtonContainer: {
        height: "100%",
        marginTop: "5%",
        width: "90%",
        display: "flex",
        justifyContent: "space-between"
    },
    uploadButton: {
        
        width: "100%",
        height: "20%",
        display: "flex",
        alignSelf: "flex-end",
        justifyContent: "flex-end",

    },
    button: {
        height: "100%",
        backgroundColor: "#459bcb",
        marginRight: "5%",
        border: "none",
        color: "#ffffff",
        borderRadius: 6
    },
    buttonInnerContainer: {
        height: "100%",
        display: "flex", 
        justifyContent: "space-between"
    },
    inputContainer: {
        visibility: "hidden"
    },
    selectCSVFile: {
        padding: 7,
        alignItems: "center",
        backgroundColor: "#459bcb",
        width: "36%",
        height: "20%",
        fontSize: 18,
        borderRadius : 6, 
        color: "#ffffff", 
        marginTop: "5%",
        marginLeft : "83%",
        boxShadow: "3"
    }
})

const conversion = {
    GBPToINR: (currency: number) => {
        return currency * 94.02;
    },
    INRToGBP: (currency: number) => {
        return currency / 94.02;
    },
};
const ConvertCurrency = () => {
    const classes = useStyles();
    const [downloadData, setDownloadData] = useState<any>([]);
    const [tableRows, setTableRows] = useState<any>([]);
    const [convertedRows, setConvertedRows] = useState<boolean>(false)
    const changeHandler = (event: any) => {
        const csvFiles = event.target.files;
        let resultsData: any = [];
        const filesArray = Array.from(csvFiles);
        const filesLength = filesArray.length;

        filesArray.forEach((file: any, index: number) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const rowsArray: any = [];
                    results.data.map((element: any) => {
                        rowsArray.push(Object.keys(element));
                    });
                    resultsData = [...resultsData, ...results.data];
                    setTableRows([...rowsArray[0], constant.amount, constant.currency]);
                    if (index === filesLength - 1) {
                        setDownloadData([...downloadData, ...resultsData]);
                    }
                },
            });
        });
    };
    const convertUploadedData = (conversionCurrency: string) => {
        setConvertedRows(true)
        if (conversionCurrency === currency.INR) {
            const convertedUploadedData = downloadData.map((item: any) => {
                if (item.Currency === conversionCurrency) {
                    return {
                        ...item,
                        convertedCurrency: item.Currency,
                        convertedAmount: item.Amount,
                    };
                }
                if (item.Currency === currency.GBP)
                    return {
                        ...item,
                        convertedCurrency: conversionCurrency,
                        convertedAmount: conversion["GBPToINR"](item.Amount),
                    };
                return item;
            });
            setDownloadData(convertedUploadedData);
        } else if (conversionCurrency === currency.GBP) {
            const convertedUploadedData = downloadData.map((item: any) => {
                if (item.Currency === conversionCurrency) {
                    return {
                        ...item,
                        convertedCurrency: item.Currency,
                        convertedAmount: item.Amount,
                    };
                }
                if (item.Currency === currency.INR)
                    return {
                        ...item,
                        convertedCurrency: conversionCurrency,
                        convertedAmount: conversion["INRToGBP"](item.Amount),
                    };
                return item;
            });
            setDownloadData(convertedUploadedData);
        }
    };
    return (
        <div>
            <div className={classes.mainContainer}>
                {constant.header}</div>
            <div className={classes.uploadButton}>
                <label htmlFor="files" className={classes.selectCSVFile}>{constant.uploadFile}</label>
                <input
                    id="files"
                    className={classes.inputContainer}
                    type="file"
                    name="file"
                    multiple
                    onChange={changeHandler}
                    accept=".csv"

                />
            </div>
            <Tablerender conversionData={downloadData} tableRow={tableRows} showConvertedRows={convertedRows} />
            <div className={classes.ButtonContainer}>
                <div className={classes.convertButtonContainer}>
                    <div>
                        <CSVLink data={downloadData}>{constant.export}</CSVLink>
                    </div>
                    <div className={classes.buttonInnerContainer}>
                        <button className={classes.button} onClick={() => convertUploadedData(currency.GBP)}>{constant.convertGbp}</button>
                        <button className={classes.button} onClick={() => convertUploadedData(currency.INR)}>{constant.convertInr}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConvertCurrency