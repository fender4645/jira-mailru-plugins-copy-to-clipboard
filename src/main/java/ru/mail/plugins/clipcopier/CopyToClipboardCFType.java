package ru.mail.plugins.clipcopier;

import java.util.Map;

import org.apache.commons.lang.StringEscapeUtils;

import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.customfields.impl.CalculatedCFType;
import com.atlassian.jira.issue.customfields.impl.FieldValidationException;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.fields.layout.field.FieldLayoutItem;

@SuppressWarnings("rawtypes")
public class CopyToClipboardCFType extends CalculatedCFType {
    public CopyToClipboardCFType() {
    }

    public Object getSingularObjectFromString(String str) throws FieldValidationException {
        return str;
    }

    public String getStringFromSingularObject(Object o) {
        if (o != null) {
            return o.toString();
        }

        return null;
    }

    public Object getValueFromIssue(CustomField customField, Issue issue) {
        if (issue != null && issue.getKey() != null) {
            return issue.getKey() + " " + issue.getSummary();
        } else {
            return "";
        }
    }

    public Map<String, Object> getVelocityParameters(Issue issue, CustomField field, FieldLayoutItem fieldLayoutItem) {
        @SuppressWarnings("unchecked")
        Map<String, Object> params = super.getVelocityParameters(issue, field, fieldLayoutItem);
        if (issue != null && issue.getId() != null) {
            params.put("issue_id", issue.getId());
            params.put("unescapedValue", issue.getKey() + " " + issue.getSummary());
        }
        return params;
    }
}