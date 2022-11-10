import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    mainContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    headerContainer: {
        height: "20%",
        width: "90%",
        backgroundColor: "#459bcb",
        color: "white",
    },
    tableContainer: {
        width: "90%",
        height: "60%",
        backgroundColor: "white",
    },
    dataContainer: {
        alignItems: "center"
    },
    tableHead: {
        height: "40%"
    }
})

interface TableDataProps {
    conversionData: any;
    tableRow: any;
    showConvertedRows: boolean;
}
const Tablerender: React.FC<TableDataProps> = ({ conversionData, tableRow, showConvertedRows }) => {
    const classes = useStyles();
    return (
        <div className={classes.mainContainer}>
            <table className={classes.tableContainer}>
                <thead className={classes.headerContainer}>
                    <tr>
                        {tableRow.map((rows: any, index: number) => {
                            if (index === 4 || index === 5) {
                                if (!showConvertedRows) {
                                    return null
                                }
                            }
                            return <th className={classes.tableHead} key={index}>{rows}</th>;

                        })}
                    </tr>
                </thead>
                <tbody>
                    {conversionData.map((value: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{value.Name}</td>
                                <td>{value.Currency}</td>
                                <td>{value.Amount}</td>
                                <td>{value.TransactionDate}</td>
                                {showConvertedRows ? <><td>{value?.convertedAmount}</td>
                                    <td>{value?.convertedCurrency}</td>
                                </> : null}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Tablerender