const ReportModel = require("../models/reports.model");

exports.create = async (report) => {
    try {
        const reportQuery = {
            reportName: report.reportName
        }
        const reportExists = await ReportModel.findOne(reportQuery);
        if (reportExists) {
            throw ({ message: 'report is already exists with the given name for id: ' + reportExists._id, code: 400 });
        }

        let newReport = new ReportModel(report);
        newReport = await newReport.save();
        return newReport;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the report: ', code: err.code || 500 });
    }
}


exports.update = async (data, query) => {

    try {
        const report = await ReportModel.findOne(query);
        if (!report)
            throw ({ message: "Report not found for id: " + query._id, code: 404 });
        let updatedReport = await ReportModel.findOneAndUpdate(query, data);
        updatedReport = await ReportModel.findById(report._id);
        return updatedReport;
    } catch (err) {
        if (err.kind === "ObjectId") {
            throw ({
                message: "Report not found for id: " + query._id,
                code: 404
            });
        }
        throw ({ message: err.message || 'Error occurred while updating the Report', code: err.code || 500 });
    }
}

exports.delete = async (reportId) => {

    try {
        const query = {
            _id: reportId
        }
        let report = await ReportModel.findOne(query);
        if (!report) {
            throw ({ message: "Report not found for id: " + query._id, code: 404 });
        }

        await ReportModel.findOneAndDelete(query);
        report = await ReportModel.find(query);
        if (report.length === 0) {
            throw ({ message: "delete success for id: " + reportId, code: 200 });
        }
        return report;
    } catch (err) {
        if (err.kind === "ObjectId") {
            throw ({
                message: "Report not found for id: " + reportId,
                code: 404
            });
        }
        throw ({ message: err.message || "Error occurred while deleting the Report.", code: err.code || 500 });
    }
}


exports.getAll = async (page, limit) => {
    try {
        const reports = await ReportModel.find().skip((Number(page) - 1) * (Number(limit))).limit(Number(limit));
        return reports;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Reports.', code: err.code || 500 });
    }
}


exports.findOne = async (query) => {
    try {
        const report = await ReportModel.findOne(query);
        if (!report)
            throw ({ message: "Report not found for the given report id: " + query._id, code: 404 });
        return report;
    } catch (err) {
        if (err.kind === "ObjectId") {
            throw ({
                message: "Report not found for id: " + query._id,
                code: 404
            });
        }
        throw ({ message: err.message || 'Error occurred while retrieving the Report.', code: err.code || 500 });
    }
}
